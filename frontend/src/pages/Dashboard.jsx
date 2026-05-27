function Dashboard() {

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">
            Total Balance
          </h2>

          <p className="text-3xl mt-4">
            $12,430
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">
            Monthly Spending
          </h2>

          <p className="text-3xl mt-4">
            $2,140
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;