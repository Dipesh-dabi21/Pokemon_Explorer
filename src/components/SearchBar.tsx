"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pl-11 text-sm bg-slate-800 text-slate-100 placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-200"
      />
      <svg
        className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-200 bg-slate-700 px-2 py-1 rounded"
        >
          Clear
        </button>
      )}
    </div>
  );
};
