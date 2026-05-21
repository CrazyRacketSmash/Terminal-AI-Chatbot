import json
import os
import uuid

FILE_PATH = "storage/convos.json"


def load_data():
    if not os.path.exists(FILE_PATH):
        return {}
    with open(FILE_PATH, "r") as f:
        print("Loading data from storage...")
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}


def save_data(data):
    os.makedirs("storage", exist_ok=True)
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


def create_session():
    return str(uuid.uuid4())


def get_session(data, session_id):
    return data.get(session_id, [])


def update_session(data, session_id, messages):
    data[session_id] = messages
    save_data(data)