"use client";

import { motion } from "motion/react";
import type { WrappedData } from "@/types";

interface SlideTopSongsProps {
  data: WrappedData;
}

export function SlideTopSongs({ data }: SlideTopSongsProps) {
  const top10 = data.topSongs.slice(0, 10);

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12 overflow-y-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        No repeat infinito
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-8"
      >
        Top Músicas
      </motion.h2>

      <div className="space-y-3">
        {top10.map((song, index) => (
          <motion.div
            key={song.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            className="flex items-center gap-3 group"
          >
            <span className={`
              text-xs font-mono w-6 text-right shrink-0
              ${index < 3 ? "text-purple-400 font-bold" : "text-spotify-gray"}
            `}>
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <p className={`
                truncate font-medium
                ${index === 0 ? "text-white text-base" : "text-spotify-lightgray text-sm"}
              `}>
                {song.name}
              </p>
            </div>

            <span className="text-spotify-gray text-xs shrink-0">
              {song.count}×
            </span>
          </motion.div>
        ))}
      </div>

      {top10[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <p className="text-spotify-gray text-sm">
            <span className="text-white font-bold">"{top10[0].name}"</span> foi sua{" "}
            música do ano 🎶
          </p>
        </motion.div>
      )}
    </div>
  );
}