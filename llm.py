import requests
import json

OLLAMA_URL = "http://localhost:11434/api/chat"

# =========================
# STREAMING RESPONSE
# =========================
def stream_llm(messages, model="llama3"):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": model,
            "messages": messages,
            "stream": True
        },
        stream=True
    )

    for line in response.iter_lines():

        if not line:
            continue

        try:
            decoded = line.decode("utf-8")
            data = json.loads(decoded)

            token = data.get("message", {}).get("content", "")

            if token:
                yield token

        except json.JSONDecodeError:
            continue