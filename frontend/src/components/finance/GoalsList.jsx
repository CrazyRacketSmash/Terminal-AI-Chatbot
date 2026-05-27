const goals = [
  {
    title: "Emergency Fund",
    current: 4000,
    target: 10000
  },
  {
    title: "Vacation",
    current: 1200,
    target: 3000
  }
];

function GoalsList() {

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
        Goals
      </h2>

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