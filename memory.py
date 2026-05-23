import json
import os
import uuid

FILE_PATH = "storage/convos.json"

def load_data():
    if not os.path.exists(FILE_PATH):
        return {"sessions": {}}
    with open(FILE_PATH, "r") as f:
        print("Loading data from storage...")
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return {"sessions": {}}

    if "sessions" not in data or not isinstance(data["sessions"], dict):
        data["sessions"] = {}

    return data


def save_data(data):
    os.makedirs("storage", exist_ok=True)
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


def create_session(data):
    session_id = str(uuid.uuid4())
    data.setdefault("sessions", {})[session_id] = {
        "title": "New Chat",
        "messages": [
            {"role": "system", "content": "You're a helpful assistant."}
        ]
    }
    save_data(data)
    return session_id

def get_session(data, session_id):
    return data["sessions"].get(session_id)

def list_sessions(data):
    return [
        {
            "session_id": sid,
            "title": info.get("title", "Untitled")
        }
        for sid, info in data.get("sessions", {}).items()
    ]

def delete_session(data, session_id):
    if session_id in data.get("sessions", {}):
        del data["sessions"][session_id]
        save_data(data)
        return True
    return False

def update_session_title(data, session_id, title):
    session = get_session(data, session_id)
    if session:
        session["title"] = title
        save_data(data)
        return True
    return False