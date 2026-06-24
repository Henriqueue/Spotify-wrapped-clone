"use client";

import { motion, AnimatePresence } from "motion/react";

interface ScreenshotButtonProps {
  onCapture: () => void;
  state: "idle" | "capturing" | "done" | "error";
}

const LABELS = {
  idle:      { icon: "⬇️", text: "Salvar slide" },
  capturing: { icon: "⏳", text: "Capturando..." },
  done:      { icon: "✅", text: "Salvo!" },
  error:     { icon: "❌", text: "Erro" },
};

export function ScreenshotButton({ onCapture, state }: ScreenshotButtonProps) {
  const { icon, text } = LABELS[state];
  const isCapturing = state === "capturing";

  return (
    <motion.button
      onClick={onCapture}
      disabled={isCapturing}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      whileTap={{ scale: 0.92 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
        transition-all duration-200 backdrop-blur-sm border
        ${state === "done"
          ? "bg-spotify-green/20 border-spotify-green/40 text-spotify-green"
          : state === "error"
          ? "bg-red-500/20 border-red-500/40 text-red-400"
          : "bg-black/40 border-white/20 text-white hover:bg-black/60 hover:border-white/40"
        }
        ${isCapturing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1.5"
        >
          <span>{icon}</span>
          <span>{text}</span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}