from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from memory import (
    load_data,
    save_data,
    create_session,
    get_session,
    list_sessions,
    delete_session,
    update_session_title
)
from fastapi.responses import StreamingResponse
from llm import stream_llm
import json

# Logics
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
db = load_data()

# Request Models
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

# Home Endpoint
@app.get("/")
def home():
    return {"message": "AI Chatbot API is running!"}

# List Sessions Endpoint
@app.get("/sessions")
def sessions():
    return list_sessions(db)

# Get Session Messages Endpoint
@app.get("/sessions/{session_id}")
def get_session_messages(session_id: str):

    session = get_session(db, session_id)

    if not session:
        return {"messages": []}

    # Filter out system messages from display
    user_messages = [m for m in session["messages"] if m["role"] != "system"]

    return {
        "messages": user_messages
    }

# New Session Endpoint
@app.post("/sessions/new")
def new_session():
    session_id = create_session(db)
    return {"session_id": session_id}

# Delete Session Endpoint
@app.delete("/sessions/{session_id}")
def delete_session_endpoint(session_id: str):
    success = delete_session(db, session_id)
    return {"success": success}

# Send stream chat Endpoint
@app.post("/chat")
def chat_stream(req: ChatRequest):

    if not req.session_id:
        req.session_id = create_session(db)

    session = get_session(db, req.session_id)

    messages = session["messages"]

    messages.append({
        "role": "user",
        "content": req.message
    })

    def generate():

        full_response = ""

        for token in stream_llm(messages):

            full_response += token

            # yield token as SSE format(JSON)
            yield f"data: {json.dumps({'token': token})}\n\n"

        # save assistant response after streaming ends
        messages.append({
            "role": "assistant",
            "content": full_response
        })

        # Auto-generate title from first user message if still "New Chat"
        session = get_session(db, req.session_id)
        if session and session["title"] == "New Chat" and len(messages) > 1:
            # Find first user message (skip system message)
            first_user_msg = next((m["content"] for m in messages if m["role"] == "user"), None)
            if first_user_msg:
                # Generate title from first message (first 50 chars)
                title = first_user_msg[:50]
                if len(first_user_msg) > 50:
                    title += "..."
                update_session_title(db, req.session_id, title)

        save_data(db)

        yield f"data: {json.dumps({'done': True, 'session_id': req.session_id})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )