import { useState } from 'react';
import Sidebar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar />
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