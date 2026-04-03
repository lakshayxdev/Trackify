import React, { useState, useEffect } from "react";
import InsightsPanel from "./InsightsPanel";

const HabitTracker = () => {
const [habits, setHabits] = useState(() => {
  return JSON.parse(localStorage.getItem("habits") || "[]");
});
const [input, setInput] = useState("");
const [filter, setFilter] = useState("all");

const addHabit = () => {
if (!input.trim()) return;


const newHabit = {
  id: Date.now(),
  name: input,
  completed: false,
  lastCompleted: null,
  streak: 0,
};
setHabits([newHabit, ...habits]);
setInput("");
};

const toggleComplete = (id) => {
const today = new Date().toDateString();


const updated = habits.map((h) => {
  if (h.id === id) {
    if (!h.completed) {
      return {
        ...h,
        completed: true,
        streak: h.streak + 1,
        lastCompleted: today,
      };
    } else {
      return { ...h, completed: false };
    }
  }
  return h;
});

setHabits(updated);


};

const deleteHabit = (id) => {
setHabits(habits.filter((h) => h.id !== id));
};

// filtering
const filteredHabits = habits.filter((h) => {
if (filter === "completed") return h.completed;
if (filter === "pending") return !h.completed;
return true;
});

const completedCount = habits.filter((h) => h.completed).length;
const progress =
habits.length === 0
? 0
: Math.round((completedCount / habits.length) * 100);



// local storage
useEffect(() => {
  localStorage.setItem("habits", JSON.stringify(habits));
}, [habits]);



return ( <div className="min-h-screen bg-[#0b0b14] text-white relative overflow-hidden">


  
  <div className="absolute w-300 h-300 bg-purple-600 opacity-20 blur-[120px] top-0 left-0 rounded-full"></div>

  <div className="max-w-4xl mx-auto space-y-6 px-4 py-6">

   
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-400">
        Trackify
      </h1>

      <h1 className="text-xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Track Today. Transform Tomorrow
      </h1>

      <div className="text-sm text-gray-400">Stay consistent 🚀</div>
    </div>

    
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-purple-300 mb-3">
        Progress Overview
      </h2>

      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>{completedCount} / {habits.length}</span>
        <span className="text-purple-400">{progress}%</span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-3">
        <div
          className="h-full bg-linear-to-r from-purple-500 to-purple-400"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>

    
    <InsightsPanel 
      habits={habits}
      filter={filter}
      setFilter={setFilter}
    />

   
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-3">
      <input
      onKeyDown={(e) => {
  if (e.key === "Enter") addHabit();
}}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add habit..."
        className="flex-1 p-3 rounded-xl bg-[#111122] border border-white/10 text-white"
      />

      <button
  onClick={() => {
    if (confirm("Are you sure you want to delete all habits?")) {
      setHabits([]);
    }
  }}
  className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-xl text-sm"
>
  Clear All
</button>

      <button
        onClick={addHabit}
        className="px-5 py-2 rounded-xl bg-linear-to-r from-purple-500 to-purple-600"
      >
        Add
      </button>
    </div>

   
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3">

      {filteredHabits.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No habits found 😴
        </p>
      )}

      {filteredHabits.map((h) => (
        <div
          key={h.id}
          className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div>
            <h3 className={h.completed ? "line-through text-gray-500" : ""}>
              {h.name}
            </h3>

            <p className="text-xs text-purple-400">
              🔥 {h.streak || 0} day streak
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleComplete(h.id)}
              className="px-3 py-1 bg-green-500 rounded"
            >
              {h.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => deleteHabit(h.id)}
              className="px-3 py-1 bg-red-500 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>

  </div>
</div>


);
};

export default HabitTracker;
