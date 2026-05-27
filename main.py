from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from memory import (
    create_session,
    get_session,
    list_sessions,
    delete_session,
    update_session_title,
    save_message
)
from fastapi.responses import StreamingResponse
from llm import stream_llm
from database import init_db
import json
from finance import (
    get_accounts,
    create_account,

    get_transactions,
    create_transaction,

    get_goals,
    create_goal
)

# Logics
init_db()
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str

# =========================
# FINANCE
# =========================
class AccountRequest(BaseModel):
    name: str
    type: str
    balance: float

class TransactionRequest(BaseModel):
    account_id: int
    description: str
    category: str
    amount: float

class GoalRequest(BaseModel):
    title: str
    current: float
    target: float

# Home Endpoint
@app.get("/")
def home():
    return {"message": "AI Chatbot API is running!"}

# List Sessions Endpoint
@app.get("/sessions")
def sessions():
    return list_sessions()

# Get Session Messages Endpoint
@app.get("/sessions/{session_id}")
def get_session_messages(session_id: str):

    session = get_session(session_id)

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
    session_id = create_session()
    return {"session_id": session_id}

# Delete Session Endpoint
@app.delete("/sessions/{session_id}")
def delete_session_endpoint(session_id: str):
    success = delete_session(session_id)
    return {"success": success}

# Send stream chat Endpoint
@app.post("/chat")
def chat_stream(req: ChatRequest):

    if not req.session_id:
        req.session_id = create_session()

    session = get_session(req.session_id)
    if not session:
        session = {
            "session_id": req.session_id,
            "title": "New Chat",
            "messages": [
                {"role": "system", "content": "You're a helpful assistant."}
            ]
        }

    save_message(req.session_id, "user", req.message)

    messages = session["messages"] + [{
        "role": "user",
        "content": req.message
    }]

    def generate():

        full_response = ""

        for token in stream_llm(messages):

            full_response += token

            # yield token as SSE format(JSON)
            yield f"data: {json.dumps({'token': token})}\n\n"

        save_message(req.session_id, "assistant", full_response)

        # Auto-generate title from first user message if still "New Chat"
        session = get_session(req.session_id)
        if session and session["title"] == "New Chat" and len(messages) > 1:
            first_user_msg = next((m["content"] for m in messages if m["role"] == "user"), None)
            if first_user_msg:
                title = first_user_msg[:50]
                if len(first_user_msg) > 50:
                    title += "..."
                update_session_title(req.session_id, title)

        yield f"data: {json.dumps({'done': True, 'session_id': req.session_id})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )

# =========================
# ACCOUNTS
# =========================
@app.get("/accounts")
def accounts():
    return get_accounts()

@app.post("/accounts")
def add_account(req: AccountRequest):
    create_account(
        req.name,
        req.type,
        req.balance
    )

    return {
        "success": True
    }

# =========================
# TRANSACTIONS
# =========================
@app.get("/transactions")
def transactions():
    return get_transactions()

@app.post("/transactions")
def add_transaction(req: TransactionRequest):
    create_transaction(
        req.account_id,
        req.description,
        req.category,
        req.amount
    )

    return {
        "success": True
    }

# =========================
# GOALS
# =========================
@app.get("/goals")
def goals():
    return get_goals()

@app.post("/goals")
def add_goal(req: GoalRequest):
    create_goal(
        req.title,
        req.current,
        req.target
    )

    return {
        "success": True
    }