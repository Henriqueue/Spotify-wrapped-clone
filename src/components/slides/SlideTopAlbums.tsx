"use client";

import { motion } from "motion/react";
import type { WrappedData } from "@/types";

interface SlideTopAlbumsProps {
  data: WrappedData;
}

export function SlideTopAlbums({ data }: SlideTopAlbumsProps) {
  const top5 = data.topAlbums.slice(0, 5);
  const maxCount = top5[0]?.count || 1;

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-pink-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        No modo álbum completo
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-10"
      >
        Top Álbuns
      </motion.h2>

      <div className="space-y-5">
        {top5.map((album, index) => (
          <motion.div
            key={album.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.12 }}
          >
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-spotify-gray w-5">
                  {index + 1}
                </span>
                <span className={`font-medium ${index === 0 ? "text-white" : "text-spotify-lightgray"} truncate max-w-[180px]`}>
                  {album.name}
                </span>
              </div>
              <span className="text-spotify-gray text-xs">
                {album.count} plays
              </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full ml-7">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(album.count / maxCount) * 100}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="h-full rounded-full bg-pink-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}