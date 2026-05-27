import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatSidebar from "./SideBar";

function FloatingAI({
  messages,
  setMessages,
  sessionId,
  setSessionId,
  sessions,
  setSessions,
}) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          z-50
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          bg-blue-600
          shadow-lg
          text-2xl
          hover:bg-blue-500
        "
      >
        ✨
      </button>

      {open && (
        <div
          className="
            fixed
            z-50
            bottom-24
            right-6
            w-[720px]
            h-[440px]
            bg-zinc-900
            border
            border-zinc-700
            rounded-2xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
          "
        >
          <div className="flex items-center justify-between gap-4 p-4 border-b border-zinc-800">
            <div>
              <h2 className="font-bold text-lg">AI Assistant</h2>
              <p className="text-sm text-zinc-400">Streaming chat with saved sessions.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="w-64 border-r border-zinc-800 bg-zinc-950 overflow-y-auto overflow-x-hidden">
              <ChatSidebar
                sessions={sessions}
                setSessions={setSessions}
                sessionId={sessionId}
                setSessionId={setSessionId}
                setMessages={setMessages}
              />
            </div>

            <div className="flex-1 bg-zinc-900 overflow-y-auto">
              <ChatWindow
                messages={messages}
                setMessages={setMessages}
                sessionId={sessionId}
                setSessionId={setSessionId}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAI;