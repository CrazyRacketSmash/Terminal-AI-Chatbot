import { useState } from "react";
import Modal from "../layout/Modal";
import { createAccount } from "../../services/api";

function AddAccountModal({ open, onClose, refresh }) {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async () => {
    await createAccount({
      name,
      type,
      balance: parseFloat(balance)
    });
    refresh();
    onClose();
  };

  return (
    <Modal
      title="Add Account"
      open={open}
      onClose={onClose}
    >
      <div className="space-y-4">
        <label className="
          block
          mb-2
          text-sm
          text-zinc-400
        ">
          Account Name
        </label>
        <input
          placeholder="e.g. Chase Checking..."
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
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
          Account Type
        </label>
        <input
          placeholder="e.g. Checking, Credit, Savings"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
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
          Initial Balance
        </label>
        <input
          placeholder="e.g. 2500"
          type="number"
          value={balance}
          onChange={(e) =>
            setBalance(e.target.value)
          }
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
          Add Account
        </button>
      </div>
    </Modal>
  );
}

export default AddAccountModal;