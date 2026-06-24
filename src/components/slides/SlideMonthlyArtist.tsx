"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { WrappedData } from "@/types";

interface SlideMonthlyArtistProps { data: WrappedData }

export function SlideMonthlyArtist({ data }: SlideMonthlyArtistProps) {
  const months = data.monthlyArtists;

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12 overflow-y-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-yellow-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Mês a mês
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-8"
      >
        Artista do Mês
      </motion.h2>

      <div className="grid grid-cols-3 gap-3">
        {months.map((m, index) => {
          const img = data.artistImages?.[m.artist];
          return (
            <motion.div
              key={m.month}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Foto do artista */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 relative shrink-0">
                {img ? (
                  <Image
                    src={img}
                    alt={m.artist}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    🎤
                  </div>
                )}
              </div>
              {/* Label do mês */}
              <p className="text-yellow-400 text-xs font-bold">{m.monthLabel}</p>
              {/* Nome do artista truncado */}
              <p className="text-white text-xs text-center leading-tight line-clamp-2">
                {m.artist}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}