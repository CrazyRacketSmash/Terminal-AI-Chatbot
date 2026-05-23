const API_URL = "http://127.0.0.1:8000"; //FASTAPI URL

// sendMessage supports streaming tokens via `onToken(token)` callback.
// Returns a promise that resolves with the full response and session_id.
export async function streamMessage(message, session_id = null, onToken = null) {
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

  // If backend didn't return a streaming body, fall back to JSON
  if (!res.body) {
    const json = await res.json();
    return {
      response: json.response ?? "",
      session_id: json.session_id ?? session_id,
    };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by a blank line
    const events = buffer.split("\n\n");
    buffer = events.pop(); // last chunk may be incomplete

    for (const event of events) {
      const lines = event.split("\n").map((l) => l.trim()).filter(Boolean);
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const dataStr = line.slice(5).trim();
          try {
            const obj = JSON.parse(dataStr);
            if (obj.token) {
              fullResponse += obj.token;
              if (onToken) onToken(obj.token);
            } else if (obj.done) {
              // stream finished marker
            }
          } catch (e) {
            // not JSON — treat as raw text
            fullResponse += dataStr;
            if (onToken) onToken(dataStr);
          }
        }
      }
    }
  }

  // Process any remaining buffered event
  if (buffer) {
    const lines = buffer.split("\n").map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      if (line.startsWith("data:")) {
        const dataStr = line.slice(5).trim();
        try {
          const obj = JSON.parse(dataStr);
          if (obj.token) {
            fullResponse += obj.token;
            if (onToken) onToken(obj.token);
          }
        } catch (e) {
          fullResponse += dataStr;
          if (onToken) onToken(dataStr);
        }
      }
    }
  }

  return {
    response: fullResponse,
    session_id,
  };
}

export async function getSessions() {
  const res = await fetch(`${API_URL}/sessions`);
  return res.json();
}


export async function createSession() {
  const res = await fetch(`${API_URL}/sessions/new`, {
    method: "POST"
  });
  return res.json();
}

export async function getSessionMessages(sessionId) {

  const res = await fetch(
    `${API_URL}/sessions/${sessionId}`
  );

  return res.json();
}

export async function deleteSession(sessionId) {
  const res = await fetch(
    `${API_URL}/sessions/${sessionId}`,
    { method: "DELETE" }
  );
  return res.json();
}