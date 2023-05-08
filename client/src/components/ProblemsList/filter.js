import React, { useState } from "react";

const options = [
  { value: "solved", label: "Solved" },
  { value: "unsolved", label: "Unsolved" }
];

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "mid", label: "Mid" },
  { value: "hard", label: "Hard" }
];

const Filter = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  return (
    <div className="w-full  md:w-2/3 lg:w-1/2  mx-auto p-4 rounded-lg drop-shadow ">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <div className="flex">
          <label className="mr-4">
            <input
              type="radio"
              name="status"
              value=""
              checked={selectedStatus === ""}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mr-2"
            />
            All
          </label>
          {options.map((option) => (
            <label key={option.value} className="mr-4">
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={selectedStatus === option.value}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Difficulty</label>
        <div className="flex">
          <label className="mr-4">
            <input
              type="radio"
              name="difficulty"
              value=""
              checked={selectedDifficulty === ""}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="mr-2"
            />
            All
          </label>
          {difficulties.map((difficulty) => (
            <label key={difficulty.value} className="mr-4">
              <input
                type="radio"
                name="difficulty"
                value={difficulty.value}
                checked={selectedDifficulty === difficulty.value}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="mr-2"
              />
              {difficulty.label}
            </label>
          ))}
        </div>
      </div>
      <button
        className="bg-[#34419A] hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded-full focus:outline-none focus:shadow-outline"
        onClick={() =>
          console.log(
            "Selected Status:",
            selectedStatus,
            "Selected Difficulty:",
            selectedDifficulty
          )
        }
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
