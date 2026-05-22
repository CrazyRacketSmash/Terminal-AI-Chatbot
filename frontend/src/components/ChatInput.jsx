import { useState } from "react";

function ChatInput() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    console.log(input);
    setInput("");
  };

  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="
            flex-1
            bg-zinc-800
            rounded-lg
            p-3
            outline-none
          "
        />

        <button
          onClick={handleSend}
          className="
            bg-blue-600
            px-5
            rounded-lg
            hover:bg-blue-500
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;