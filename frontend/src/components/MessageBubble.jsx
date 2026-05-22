function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%]
          rounded-2xl
          px-4
          py-3
          whitespace-pre-wrap
          ${
            isUser
              ? "bg-blue-600"
              : "bg-zinc-800"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MessageBubble;