import React from 'react';
export default function SeasonSelector({ season, setSeason }) {
  return (
    <div className="mt-4">
      <label className="font-semibold text-sm">Select Season:</label>
      <select
        className="ml-2 p-2 border rounded shadow-sm"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      >
        <option value="regular">Regular</option>
        <option value="summer">Summer</option>
        <option value="exam">Exam</option>
      </select>
    </div>
  );
}
