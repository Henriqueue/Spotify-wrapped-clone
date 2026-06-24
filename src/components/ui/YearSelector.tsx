"use client";

import { motion } from "motion/react";

interface YearSelectorProps {
  years: string[];
  selected: string;
  onChange: (year: string) => void;
  disabled?: boolean;
}

export function YearSelector({ years, selected, onChange, disabled }: YearSelectorProps) {
  if (years.length <= 1) return null; // não mostra se só tem um ano

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <span className="text-spotify-gray text-xs">Ano:</span>
      <div className="flex gap-1">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => !disabled && onChange(year)}
            disabled={disabled}
            className={`
              px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
              ${selected === year
                ? "bg-spotify-green text-black"
                : "bg-white/10 text-spotify-lightgray hover:bg-white/20"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {year}
          </button>
        ))}
      </div>
    </motion.div>
  );
}