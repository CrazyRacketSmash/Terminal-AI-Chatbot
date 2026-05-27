const accounts = [
  {
    name: "Chase Debit",
    type: "Checking",
    balance: 4200
  },
  {
    name: "Discover Credit",
    type: "Credit",
    balance: -320
  },
  {
    name: "Roth IRA",
    type: "Investment",
    balance: 8200
  }
];

function AccountsList() {

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
        Accounts
      </h2>

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