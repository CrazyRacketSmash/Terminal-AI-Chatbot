import Sidebar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;