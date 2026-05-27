import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { month: "Jan", spending: 1200 },
    { month: "Feb", spending: 1800 },
    { month: "Mar", spending: 1500 },
    { month: "Apr", spending: 2200 },
    { month: "May", spending: 1700 },
];

function SpendingChart() {

    return (
        <div className="
      bg-zinc-800
      rounded-2xl
      p-6
      h-[350px]
    ">

            <h2 className="
        text-xl
        font-semibold
        mb-6
      ">
                Spending Trend
            </h2>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="month" stroke="#a1a1aa" />        {/* zinc-400 */}
                        <YAxis stroke="#a1a1aa" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}
                            labelStyle={{ color: "#fafafa" }}
                            itemStyle={{ color: "#fafafa" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="spending"
                            stroke="#4f46e5"        // indigo-600
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default SpendingChart;