function AccountsList({ accounts = [], onAdd }) {

  return (
    <div className="
      bg-zinc-800
      rounded-2xl
      p-6
    ">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Accounts</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Add Account
          </button>
        )}
      </div>

      <div className="space-y-4">

        {accounts.map((account, i) => (

          <div
            key={i}
            className="
              flex
              justify-between
              items-center
              border-b
              border-zinc-700
              pb-3
            "
          >

            <div>
              <p className="font-medium">
                {account.name}
              </p>

              <p className="
                text-sm
                text-zinc-400
              ">
                {account.type}
              </p>
            </div>

            <p className="font-bold">
              ${account.balance}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AccountsList;