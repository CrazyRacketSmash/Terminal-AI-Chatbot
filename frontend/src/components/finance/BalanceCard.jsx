function BalanceCard({
  title,
  amount
}) {

  return (
    <div className="
      bg-zinc-800
      rounded-2xl
      p-6
    ">

      <h2 className="
        text-zinc-400
        text-sm
      ">
        {title}
      </h2>

      <p className="
        text-3xl
        font-bold
        mt-3
      ">
        ${amount}
      </p>

    </div>
  );
}

export default BalanceCard;