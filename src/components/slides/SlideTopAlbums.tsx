"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { WrappedData } from "@/types";

interface SlideTopAlbumsProps { data: WrappedData }

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
        Modo álbum completo
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-8"
      >
        Top Álbuns
      </motion.h2>

      <div className="space-y-5">
        {top5.map((album, index) => {
          const img = data.albumImages?.[album.name];
          return (
            <motion.div
              key={album.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.12 }}
              className="flex items-center gap-3"
            >
              {/* Capa do álbum */}
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0 relative">
                {img ? (
                  <Image src={img} alt={album.name} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">💿</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1.5">
                  <div className="min-w-0">
                    <p className={`font-medium truncate ${index === 0 ? "text-white text-sm" : "text-spotify-lightgray text-xs"}`}>
                      {album.name}
                    </p>
                    {album.artist && (
                      <p className="text-spotify-gray text-xs truncate">{album.artist}</p>
                    )}
                  </div>
                  <span className="text-spotify-gray text-xs ml-2 shrink-0">{album.count}p</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(album.count / maxCount) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="h-full rounded-full bg-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}