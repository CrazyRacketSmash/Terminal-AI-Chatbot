import { useState } from "react";
import Modal from "../layout/Modal";
import { createGoal } from "../../services/api";

function AddGoalModal({ open, onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState("");

  const handleSubmit = async () => {
    await createGoal({
      title,
      current: Number(current),
      target: parseFloat(target)
    });
    refresh();
    onClose();
  };

  return (
    <Modal
      title="Add Goal"
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
          Goal Title
        </label>
        <input
          placeholder="e.g. Emergency Fund"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          Current Amount
        </label>
        <input
          placeholder="e.g. 0"
          type="number"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
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
          Target Amount
        </label>
        <input
          placeholder="e.g. 5000"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
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
          Add Goal
        </button>
      </div>
    </Modal>
  );
}

export default AddGoalModal;
