"use client";

import { motion } from "motion/react";
import type { WrappedData } from "@/types";

interface SlideStatsProps {
  data: WrappedData;
}

function getHourLabel(hour: number): string {
  if (hour >= 5 && hour < 12) return "manhã ☀️";
  if (hour >= 12 && hour < 18) return "tarde 🌤️";
  if (hour >= 18 && hour < 22) return "noite 🌙";
  return "madrugada 🌃";
}

export function SlideStats({ data }: SlideStatsProps) {
  const stats = [
    {
      label: "Total de plays",
      value: data.totalScrobbles.toLocaleString("pt-BR"),
      sub: "músicas ouvidas",
      color: "text-spotify-green",
    },
    {
      label: "Artistas únicos",
      value: data.topArtists.length.toString(),
      sub: "artistas diferentes",
      color: "text-purple-400",
    },
    {
      label: "Hora mais ativa",
      value: `${data.topListeningHour}h`,
      sub: `você ama a ${getHourLabel(data.topListeningHour)}`,
      color: "text-orange-400",
    },
    {
      label: "Álbuns explorados",
      value: data.topAlbums.length.toString(),
      sub: "álbuns mais ouvidos",
      color: "text-blue-400",
    },
  ];

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Em números
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-10"
      >
        Seu Ano em Dados
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="bg-white/5 rounded-2xl p-5 border border-white/10"
          >
            <p className="text-spotify-gray text-xs mb-3">{stat.label}</p>
            <p className={`text-3xl font-black mb-1 ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-spotify-lightgray text-xs">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}