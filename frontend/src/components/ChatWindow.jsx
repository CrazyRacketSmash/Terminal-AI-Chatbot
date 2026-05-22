import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

function ChatWindow({ messages, setMessages, sessionId, setSessionId }) {

  const bottomRef = useRef(null);

  // auto-scroll whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1">

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {/* invisible anchor */}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        messages={messages}
        setMessages={setMessages}
        sessionId={sessionId}
        setSessionId={setSessionId}
      />
    </div>
  );
}

export default ChatWindow;