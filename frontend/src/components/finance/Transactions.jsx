function Transactions({ transactions = [] }) {

  return (
    <div className="
      bg-zinc-800
      rounded-2xl
      p-6
    ">

      <h2 className="
        text-xl
        font-semibold
        mb-6
      ">
        Recent Transactions
      </h2>

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