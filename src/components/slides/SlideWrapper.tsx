"use client";

import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";

interface SlideWrapperProps {
  children: ReactNode;
  slideKey: string;  // Key única para o AnimatePresence saber que trocou
  direction?: "forward" | "backward";
}

const variants = {
  enter: (direction: string) => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === "forward" ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function SlideWrapper({ children, slideKey, direction = "forward" }: SlideWrapperProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slideKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}