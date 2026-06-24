"use client";

import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { WrappedData } from "@/types";

interface SlideCoverProps { data: WrappedData }

export function SlideCover({ data }: SlideCoverProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-spotify-dark relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-spotify-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-spotify-green font-medium text-lg mb-4 uppercase tracking-widest"
        >
          Last.fm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-7xl md:text-9xl font-black text-white mb-6 leading-none"
        >
          {data.year}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-spotify-lightgray text-xl"
        >
          Você ouviu{" "}
          <AnimatedNumber
            value={data.totalScrobbles}
            className="text-white font-bold"
          />{" "}
          músicas
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-spotify-gray text-sm mt-8"
        >
          Deslize para começar →
        </motion.p>
      </div>
    </div>
  );
}