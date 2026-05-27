import BalanceCard from "../components/finance/BalanceCard";
import SpendingChart from "../components/finance/SpendingChart";
import AccountsList from "../components/finance/AccountsList";
import GoalsList from "../components/finance/GoalsList";
import Transactions from "../components/finance/Transactions";

function Finance() {
  return (
    <div className="p-8 space-y-8">

      <h1 className="
        text-4xl
        font-bold
      ">
        Finance Dashboard
      </h1>

      {/* Top Cards */}
      <div className="
        grid
        grid-cols-3
        gap-6
      ">

        <BalanceCard
          title="Total Balance"
          amount="12,430"
        />

        <BalanceCard
          title="Monthly Spending"
          amount="2,140"
        />

        <BalanceCard
          title="Savings"
          amount="8,200"
        />

      </div>

      {/* Chart */}
      <SpendingChart />

      {/* Accounts + Goals */}
      <div className="
        grid
        grid-cols-2
        gap-6
      ">

        <AccountsList />

        <GoalsList />

      </div>

      {/* Transactions */}
      <Transactions />

    </div>
  );
}
export default Finance;