import { useState } from "react";
import Modal from "../layout/Modal";
import { createTransaction } from "../../services/api";

function AddTransactionModal({ open, onClose, refresh, accounts = [] }) {

  const [accountId, setAccountId] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const defaultAccountId = accounts.length > 0 ? (accounts[0].id ?? accounts[0].account_id) : "";
  const selectedAccountId = accountId || defaultAccountId;

  const handleSubmit = async () => {
    if (!selectedAccountId || !description || !category || amount === "") {
      return;
    }

    await createTransaction({
      account_id: Number(selectedAccountId),
      description,
      category,
      amount: parseFloat(amount)
    });
    refresh();
    onClose();
  };

  return (
    <Modal
      title="Add Transaction"
      open={open}
      onClose={onClose}
    >
      <div className="space-y-4 overflow-y-auto">
        <label className="
          block
          mb-2
          text-sm
          text-zinc-400
        ">
          Account
        </label>
        <select
          value={selectedAccountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-800
          "
        >
          {accounts.length === 0 ? (
            <option value="">No accounts available</option>
          ) : (
            accounts.map((account) => (
              <option
                key={account.id ?? account.account_id}
                value={account.id ?? account.account_id}
              >
                {account.name}
              </option>
            ))
          )}
        </select>

        <label className="
          block
          mb-2
          text-sm
          text-zinc-400
        ">
          Description
        </label>
        <input
          placeholder="e.g. Grocery shopping"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-800
          "
        />

        <label className="
          block
          mb-2
          text-sm
          text-zinc-400
        ">
          Category
        </label>
        <input
          placeholder="e.g. Food, Income, Travel"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-800
          "
        />

        <label className="
          block
          mb-2
          text-sm
          text-zinc-400
        ">
          Amount
        </label>
        <input
          placeholder="e.g. -50"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
            w-full
            p-3
            rounded-lg
            bg-zinc-800
          "
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-blue-600
            p-3
            rounded-lg
          "
        >
          Add Transaction
        </button>
      </div>
    </Modal>
  );
}

export default AddTransactionModal;