"use client";

import { motion } from "motion/react";
import type { WrappedData } from "@/types";

interface SlideTopArtistsProps {
  data: WrappedData;
}

const COLORS = [
  "bg-spotify-green text-black",
  "bg-purple-500 text-white",
  "bg-blue-500 text-white",
  "bg-orange-500 text-white",
  "bg-pink-500 text-white",
];

export function SlideTopArtists({ data }: SlideTopArtistsProps) {
  const top5 = data.topArtists.slice(0, 5);

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-spotify-green font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Seus favoritos
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-10"
      >
        Top Artistas
      </motion.h2>

      <div className="space-y-4">
        {top5.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {/* Número */}
            <span
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                font-black text-sm shrink-0
                ${index === 0 ? COLORS[0] : "bg-white/10 text-white"}
              `}
            >
              {index + 1}
            </span>

            {/* Barra de progresso */}
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-1">
                <span className={`font-semibold ${index === 0 ? "text-white text-lg" : "text-spotify-lightgray"}`}>
                  {artist.name}
                </span>
                <span className="text-spotify-gray text-xs">
                  {artist.count.toLocaleString("pt-BR")} plays
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(artist.count / top5[0].count) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    index === 0 ? "bg-spotify-green" : "bg-white/40"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Destaque do #1 */}
      {top5[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 p-4 rounded-xl bg-spotify-green/10 border border-spotify-green/20"
        >
          <p className="text-spotify-lightgray text-sm">
            Você ouviu <span className="text-spotify-green font-bold">{top5[0].name}</span> mais do que qualquer outro artista —{" "}
            <span className="text-white font-semibold">{top5[0].count.toLocaleString("pt-BR")} vezes</span>
          </p>
        </motion.div>
      )}
    </div>
  );
}