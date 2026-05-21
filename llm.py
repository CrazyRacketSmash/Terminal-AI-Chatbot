import requests
import json

OLLAMA_URL = "http://localhost:11434/api/chat"


def ask_llm(messages, model="llama3"):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": model,
            "messages": messages,
            "stream": True
        },
        stream=True
    )

    raw = response.text.strip()

    try:
        # normal case
        data = json.loads(raw)
        return data["message"]["content"]

    except json.JSONDecodeError:
        # fallback: Ollama sometimes returns multiple JSON objects
        lines = raw.split("\n")
        last_valid = None

        for line in lines:
            try:
                last_valid = json.loads(line)
            except:
                continue

        if last_valid:
            return last_valid.get("message", {}).get("content", "")

        raise Exception("Failed to parse Ollama response")