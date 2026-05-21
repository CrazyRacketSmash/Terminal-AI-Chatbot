from fastapi import FastAPI
from pydantic import BaseModel
from memory import (
    load_data,
    save_data,
    create_session,
    get_session,
    update_session,
    list_sessions
)
from llm import ask_llm

# Logics
app = FastAPI()
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

# Send chat Endpoint
@app.post("/chat")
def chat(req: ChatRequest):
    global db

    if not req.session_id:
        req.session_id = create_session(db)

    session = get_session(db, req.session_id)
    if session is None:
        req.session_id = create_session(db)
        session = get_session(db, req.session_id)

    messages = session["messages"]

    # Add user message
    messages.append({
        "role": "user",
        "content": req.message
    })

    # Call LLM
    reply = ask_llm(messages)

    # Save assistant response
    messages.append({
        "role": "assistant",
        "content": reply
    })

    save_data(db)

    return {
        "session_id": req.session_id,
        "response": reply
    }