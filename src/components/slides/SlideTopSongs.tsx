"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { WrappedData } from "@/types";

interface SlideTopSongsProps { data: WrappedData }

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
        className="text-4xl font-black text-white mb-6"
      >
        Top Músicas
      </motion.h2>

      <div className="space-y-3">
        {top10.map((song, index) => {
          const img = data.songImages?.[song.name];
          return (
            <motion.div
              key={song.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="flex items-center gap-3"
            >
              <span className={`text-xs font-mono w-5 text-right shrink-0 ${index < 3 ? "text-purple-400 font-bold" : "text-spotify-gray"}`}>
                {index + 1}
              </span>

              {/* Capa da música (álbum) */}
              <div className="w-9 h-9 rounded overflow-hidden bg-white/10 shrink-0 relative">
                {img ? (
                  <Image src={img} alt={song.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm">🎵</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`truncate font-medium ${index === 0 ? "text-white text-sm" : "text-spotify-lightgray text-xs"}`}>
                  {song.name}
                </p>
                {song.artist && (
                  <p className="text-spotify-gray text-xs truncate">{song.artist}</p>
                )}
              </div>

              <span className="text-spotify-gray text-xs shrink-0">{song.count}×</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}