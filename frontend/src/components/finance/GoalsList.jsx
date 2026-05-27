function GoalsList({ goals = [], onAdd }) {

  return (
    <div className="
      bg-zinc-800
      rounded-2xl
      p-6
    ">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Goals</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Add Goal
          </button>
        )}
      </div>

      <div className="space-y-6">

        {goals.map((goal, i) => {

          const percent =
            (goal.current / goal.target) * 100;

          return (

            <div key={i}>

              <div className="
                flex
                justify-between
                mb-2
              ">

                <span>{goal.title}</span>

                <span>
                  ${goal.current} / ${goal.target}
                </span>

              </div>

              <div className="
                w-full
                bg-zinc-700
                rounded-full
                h-3
              ">

                <div
                  className="
                    bg-blue-500
                    h-3
                    rounded-full
                  "
                  style={{
                    width: `${percent}%`
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default GoalsList;