import { useState, useEffect } from 'react';
import Sidebar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";
import { getSessions } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);

  // load sidebar sessions
  useEffect(() => {
    async function loadSessions() {
      const data = await getSessions();
      setSessions(data);
    }
    loadSessions();
  }, []);

  // refresh sessions when sessionId changes (after new message creates a session)
  useEffect(() => {
    async function refreshSessions() {
      const data = await getSessions();
      setSessions(data);
    }
    if (sessionId) {
      refreshSessions();
    }
  }, [sessionId]);

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        sessions={sessions}
        setSessions={setSessions}
        sessionId={sessionId}
        setSessionId={setSessionId}
        setMessages={setMessages}
      />
      <ChatWindow 
        messages={messages}
        setMessages={setMessages}
        sessionId={sessionId}
        setSessionId={setSessionId}
      />
    </div>
  );
}

export default App;