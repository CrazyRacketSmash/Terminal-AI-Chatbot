from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from memory import (
    load_data,
    save_data,
    create_session,
    get_session,
    list_sessions
)
from fastapi.responses import StreamingResponse
from llm import stream_llm

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

# New Session Endpoint
@app.post("/sessions/new")
def new_session():
    session_id = create_session(db)
    return {"session_id": session_id}

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
            yield f'data: {token}\n\n'

        # save assistant response after streaming ends
        messages.append({
            "role": "assistant",
            "content": full_response
        })

        save_data(db)

        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )