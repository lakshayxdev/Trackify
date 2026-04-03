import React from "react";

const InsightsPanel = ({ habits, filter, setFilter }) => {
const totalCompleted = habits.filter(h => h.completed).length;

const bestStreak = Math.max(
...habits.map(h => h.streak || 0),
0
);

const currentStreak = habits.filter(h => h.completed).length;

return ( <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">


  <h2 className="text-xl font-semibold text-purple-300">
    Insights & Filters 🚀
  </h2>

  
  <div className="grid grid-cols-3 gap-4 text-center">

    <div className="p-4 bg-white/5 rounded-xl">
      <p className="text-sm text-gray-400">Current Streak</p>
      <h3 className="text-2xl font-bold text-purple-400">
        {currentStreak}
      </h3>
    </div>

    <div className="p-4 bg-white/5 rounded-xl">
      <p className="text-sm text-gray-400">Total Completed</p>
      <h3 className="text-2xl font-bold text-purple-400">
        {totalCompleted}
      </h3>
    </div>

    <div className="p-4 bg-white/5 rounded-xl">
      <p className="text-sm text-gray-400">Best Streak</p>
      <h3 className="text-2xl font-bold text-purple-400">
        {bestStreak}
      </h3>
    </div>

  </div>

  
  <div className="flex gap-3 justify-center">

    <button
      onClick={() => setFilter("all")}
      className={`px-4 py-2 rounded-lg text-sm transition ${
        filter === "all"
          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10"
      }`}
    >
      All
    </button>

    <button
      onClick={() => setFilter("completed")}
      className={`px-4 py-2 rounded-lg text-sm transition ${
        filter === "completed"
          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10"
      }`}
    >
      Completed
    </button>

    <button
      onClick={() => setFilter("pending")}
      className={`px-4 py-2 rounded-lg text-sm transition ${
        filter === "pending"
          ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10"
      }`}
    >
      Pending
    </button>

  </div>

</div>


);
};

export default InsightsPanel;
