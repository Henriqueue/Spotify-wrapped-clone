"use client";

import { motion } from "motion/react";

interface SlideNavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function SlideNav({ current, total, onPrev, onNext, onReset }: SlideNavProps) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between"
    >
      {/* Indicadores de slide */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-spotify-green"
                : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Botões */}
      <div className="flex items-center gap-2">
        {!isFirst && (
          <button
            onClick={onPrev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                       flex items-center justify-center text-white transition-all"
          >
            ←
          </button>
        )}

        {!isLast ? (
          <button
            onClick={onNext}
            className="px-6 h-10 rounded-full bg-spotify-green hover:bg-spotify-green/80
                       text-black font-semibold text-sm transition-all"
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={onReset}
            className="px-6 h-10 rounded-full bg-white/10 hover:bg-white/20
                       text-white font-semibold text-sm transition-all"
          >
            Recomeçar
          </button>
        )}
      </div>
    </motion.div>
  );
}