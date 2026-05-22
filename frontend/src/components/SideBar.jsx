function Sidebar() {
  return (
    <div className="w-64 border-r border-zinc-800 p-4">
      <button className="w-full bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700">
        + New Chat
      </button>

      <div className="mt-6 space-y-2">
        <div className="p-3 rounded-lg bg-zinc-800 cursor-pointer">
          Chat 1
        </div>
      </div>
    </div>
  );
}

export default Sidebar;