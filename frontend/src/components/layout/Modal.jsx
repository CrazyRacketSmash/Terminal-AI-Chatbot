function Modal({ title, open, onClose, children }) {

  if (!open) return null;

  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-zinc-900
        rounded-2xl
        p-6
        w-[500px]
        border
        border-zinc-700
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-zinc-400
              hover:text-white
            "
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}

export default Modal;