import { createSession, getSessionMessages, getSessions, deleteSession } from "../../services/api";

function Sidebar({
  sessions,
  setSessions,
  sessionId,
  setSessionId,
  setMessages
}) {

  const handleNewChat = async () => {
    const data = await createSession();
    setSessionId(data.session_id);
    setMessages([]);
    // refresh sidebar
    const updated = await getSessions();
    setSessions(updated);
  };

  const handleLoadSession = async (id) => {
    setSessionId(id);
    const data = await getSessionMessages(id);
    setMessages(data.messages || []);
  };

  const handleDeleteSession = async (e, id) => {
    e.stopPropagation();
    await deleteSession(id);
    // refresh sidebar
    const updated = await getSessions();
    setSessions(updated);
    // if deleted session was active, clear it
    if (sessionId === id) {
      setSessionId(null);
      setMessages([]);
    }
  };

  return (
    <div className="w-64 border-r border-zinc-800 p-4 overflow-y-auto flex flex-col">
      <button
        onClick={handleNewChat}
        className="
          w-full
          bg-zinc-800
          rounded-lg
          p-3
          hover:bg-zinc-700
        "
      >
        New Chat
      </button>

      <div className="mt-6 space-y-2 flex-1 overflow-y-auto">

        {sessions.map((session) => (

          <div
            key={session.session_id}
            onClick={() =>
              handleLoadSession(session.session_id)
            }
            className={`
              p-3
              rounded-lg
              cursor-pointer
              truncate
              flex
              justify-between
              items-center
              group
              ${
                sessionId === session.session_id
                  ? "bg-blue-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }
            `}
          >
            <span className="flex-1 truncate">{session.title}</span>
            <button
              onClick={(e) => handleDeleteSession(e, session.session_id)}
              className="
                opacity-0
                group-hover:opacity-100
                ml-2
                p-1
                text-red-400
                hover:text-red-300
                text-sm
              "
              title="Delete session"
            >
              ✕
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;