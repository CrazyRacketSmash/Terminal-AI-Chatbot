function Transactions({ transactions = [], onAdd }) {

  return (
    <div className="
      bg-zinc-800
      rounded-2xl
      p-6
    ">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Add Transaction
          </button>
        )}
      </div>

      <div className="space-y-4">

        {transactions.map((tx, i) => (

          <div
            key={i}
            className="
              flex
              justify-between
              border-b
              border-zinc-700
              pb-3
            "
          >

            <div>

              <p>{tx.description}</p>

              <p className="
                text-sm
                text-zinc-400
              ">
                {tx.category}
              </p>

            </div>

            <p className="font-bold">
              ${tx.amount}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Transactions;