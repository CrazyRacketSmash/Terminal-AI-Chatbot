import BalanceCard from "../components/finance/BalanceCard";
import SpendingChart from "../components/finance/SpendingChart";
import AccountsList from "../components/finance/AccountsList";
import AddAccountModal from "../components/finance/AddAccountModal";
import AddTransactionModal from "../components/finance/AddTransactionModal";
import AddGoalModal from "../components/finance/AddGoalModal";
import GoalsList from "../components/finance/GoalsList";
import Transactions from "../components/finance/Transactions";
import { useEffect, useState } from "react";
import { getAccounts, getTransactions, getGoals } from "../services/api";
function Finance() {

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  const loadData = async () => {
      const accountsData = await getAccounts();
      const transactionsData = await getTransactions();
      const goalsData = await getGoals();

      setAccounts(accountsData);
      setTransactions(transactionsData);
      setGoals(goalsData);
};

  useEffect(() => {
    const init = async () => {
      await loadData();
    };
    init();
  }, []);

  // analytics
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  const monthlySpending = transactions
    .filter(tx => tx.amount < 0)
    .reduce(
      (sum, tx) => sum + Math.abs(tx.amount),
      0
    );

  const savings = accounts.reduce(
    (sum, acc) => acc.balance > 0 ? sum + acc.balance : sum,
    0
  );

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
          amount={totalBalance.toLocaleString()}
        />

        <BalanceCard
          title="Monthly Spending"
          amount={monthlySpending.toLocaleString()}
        />

        <BalanceCard
          title="Savings"
          amount={savings.toLocaleString()}
        />

      </div>

      {/* Chart */}
      <SpendingChart data={transactions} />

      {/* Accounts + Goals */}
      <div className="
        grid
        grid-cols-2
        gap-6
      ">
        <AccountsList
          accounts={accounts}
          onAdd={() => setAccountModalOpen(true)}
        />

        <GoalsList
          goals={goals}
          onAdd={() => setGoalModalOpen(true)}
        />
      </div>

      {/* Transactions */}
      <Transactions
        transactions={transactions}
        onAdd={() => setTransactionModalOpen(true)}
      />

      {/* Modals */}
      <AddAccountModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        refresh={loadData}
      />
      <AddTransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        refresh={loadData}
        accounts={accounts}
      />
      <AddGoalModal
        open={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        refresh={loadData}
      />
    </div>
  );
}
export default Finance;