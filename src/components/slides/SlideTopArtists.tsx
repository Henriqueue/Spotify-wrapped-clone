"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { WrappedData } from "@/types";

interface SlideTopArtistsProps { data: WrappedData }

export function SlideTopArtists({ data }: SlideTopArtistsProps) {
  const top5 = data.topArtists.slice(0, 5);

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-spotify-green font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Seus favoritos
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-8"
      >
        Top Artistas
      </motion.h2>

      <div className="space-y-5">
        {top5.map((artist, index) => {
          const img = data.artistImages?.[artist.name];
          return (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.12 }}
              className="flex items-center gap-4"
            >
              {/* Foto do artista */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                {img ? (
                  <Image src={img} alt={artist.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">🎤</div>
                )}
                {/* Badge de posição sobre a foto */}
                <div className={`
                  absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center
                  text-[10px] font-black
                  ${index === 0 ? "bg-spotify-green text-black" : "bg-white/20 text-white"}
                `}>
                  {index + 1}
                </div>
              </div>

              {/* Barra */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`font-semibold truncate ${index === 0 ? "text-white text-base" : "text-spotify-lightgray text-sm"}`}>
                    {artist.name}
                  </span>
                  <AnimatedNumber
                    value={artist.count}
                    className="text-spotify-gray text-xs ml-2 shrink-0"
                    formatter={(n) => `${Math.round(n).toLocaleString("pt-BR")} plays`}
                  />
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(artist.count / top5[0].count) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${index === 0 ? "bg-spotify-green" : "bg-white/40"}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {top5[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 p-4 rounded-xl bg-spotify-green/10 border border-spotify-green/20"
        >
          <p className="text-spotify-lightgray text-sm">
            Você ouviu <span className="text-spotify-green font-bold">{top5[0].name}</span> mais do que qualquer outro artista
          </p>
        </motion.div>
      )}
    </div>
  );
}