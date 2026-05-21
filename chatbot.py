import requests
import json

url = "http://localhost:11434/api/chat"

messages = [
   {
	"role": "system",
	"content": "You're a very helpful assistant."
   }
]

print("Local AI Chatbot (type 'exit' to quit)\n")

while True:
    prompt = input("You: ")

    if prompt.lower() == "exit":
        break

    messages.append({
        "role": "user",
        "content": prompt
    })

    response = requests.post(
        url,
        json={
            "model": "llama3",
            "messages": messages,
            "stream": True
        },
        stream=True
    )

    print("\nAI: ", end="", flush=True)

    full_response = ""

    for line in response.iter_lines():
        if not line:
            continue

        try:
            decoded = line.decode("utf-8")
            data = json.loads(decoded)

            # Extract the actual text
            token = data.get("message", {}).get("content", "")

            print(token, end="", flush=True)
            full_response += token

        except json.JSONDecodeError:
            continue

    print("\n")

    messages.append({
        "role": "assistant",
        "content": full_response
    })
