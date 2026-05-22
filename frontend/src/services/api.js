const API_URL = "http://127.0.0.1:8000"; //FASTAPI URL

export async function sendMessage(message, session_id = null) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      session_id,
    }),
  });

  // Read the stream and parse SSE format
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6); // Remove "data: " prefix
        if (data !== "[DONE]") {
          fullResponse += data;
        }
      }
    }
  }

  return {
    response: fullResponse,
    session_id: session_id,
  };
}