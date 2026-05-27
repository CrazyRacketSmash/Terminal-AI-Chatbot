import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from 'react';

import Sidebar from "./components/layout/SideBar";
import FloatingAI from "./components/chat/FloatingAI";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
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
      <Sidebar />

      <FloatingAI
        messages={messages}
        setMessages={setMessages}
        sessionId={sessionId}
        setSessionId={setSessionId}
        sessions={sessions}
        setSessions={setSessions}
      />

      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;