import { useState } from "react";
import { streamMessage } from "../.././services/api";

function ChatInput({ setMessages, sessionId, setSessionId }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;

    setInput("");
    setLoading(true);

    // create EMPTY assistant message
    let assistantMessage = {
      role: "assistant",
      content: "",
    };

    // immediately render assistant bubble
    setMessages((prev) => [...prev, assistantMessage]);

    const result = await streamMessage(
      currentInput,
      sessionId,

      (token) => {

        assistantMessage.content += token;

        // force rerender
        setMessages((prev) => {

          const updated = [...prev];

          updated[updated.length - 1] = {
            ...assistantMessage
          };

          return updated;
        });
      }
    );

    // Update sessionId if it was created on this message
    if (result.session_id && !sessionId) {
      setSessionId(result.session_id);
    }

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