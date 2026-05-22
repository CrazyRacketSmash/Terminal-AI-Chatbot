import { useState } from "react";
import { sendMessage } from "../services/api";

function ChatInput({ messages, setMessages, sessionId, setSessionId }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage]; // Add user message to the chat history before sending to the server
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const data = await sendMessage(input, sessionId);

    setSessionId(data.session_id);

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: data.response,
      },
    ]);

    setLoading(false);
  };

  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Send a message..."
          className="flex-1 bg-zinc-800 rounded-lg p-3 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 px-5 rounded-lg hover:bg-blue-500"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;