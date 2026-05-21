from fastapi import FastAPI
from pydantic import BaseModel
import uuid
from memory import (
    load_data,
    save_data,
    create_session,
    get_session,
    update_session
)
from llm import ask_llm

# Logics
app = FastAPI()
db = load_data()

# Request Models
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

@app.get("/")
def home():
    return {"message": "AI Chatbot API is running!"}
# Send chat Endpoint
@app.post("/chat")
def chat(req: ChatRequest):
    global db

    # Create session if missing
    if not req.session_id:
        req.session_id = create_session()
        db[req.session_id] = [
            {"role": "system", "content": "You're a helpful assistant."}
        ]

    # Get history
    messages = get_session(db, req.session_id)

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

    update_session(db, req.session_id, messages)

    return {
        "session_id": req.session_id,
        "response": reply,
        "history": messages
    }