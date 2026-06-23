"use client";

import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { WrappedData } from "@/types";

interface SlideGenresProps {
  data: WrappedData;
}

const GENRE_COLORS = [
  "#1DB954", "#A855F7", "#3B82F6",
  "#F97316", "#EC4899", "#14B8A6",
  "#EAB308", "#EF4444",
];

export function SlideGenres({ data }: SlideGenresProps) {
  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Seu gosto musical
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-8"
      >
        Top Gêneros
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="h-56"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.topGenres}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#B3B3B3", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#535353", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#191414",
                border: "1px solid #535353",
                borderRadius: "8px",
                color: "#fff",
              }}
            formatter={(value) => [
              `${(value ?? 0).toLocaleString("pt-BR")} plays`,
              "Plays",
            ]}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.topGenres.map((_item: { name: string; count: number }, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={GENRE_COLORS[index % GENRE_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {data.topGenres[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-spotify-lightgray text-sm">
            Seu gênero dominante é{" "}
            <span className="text-spotify-green font-bold">
              {data.topGenres[0].name}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}