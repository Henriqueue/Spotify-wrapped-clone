"use client";

import { motion } from "motion/react";
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import type { WrappedData } from "@/types";

interface SlideHourlyProps { data: WrappedData }

function getTimeLabel(hour: number) {
  if (hour >= 5 && hour < 12) return { label: "manhã", emoji: "☀️" };
  if (hour >= 12 && hour < 18) return { label: "tarde", emoji: "🌤️" };
  if (hour >= 18 && hour < 22) return { label: "noite", emoji: "🌙" };
  return { label: "madrugada", emoji: "🌃" };
}

export function SlideHourly({ data }: SlideHourlyProps) {
  const { label, emoji } = getTimeLabel(data.topListeningHour);

  return (
    <div className="h-full flex flex-col justify-center bg-spotify-dark px-8 py-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-teal-400 font-semibold uppercase tracking-widest text-sm mb-2"
      >
        Seu ritmo diário
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black text-white mb-2"
      >
        Quando você ouve
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-spotify-lightgray text-sm mb-8"
      >
        Pico às <span className="text-white font-bold">{data.topListeningHour}h</span>
        {" "}— você é um ouvinte da {label} {emoji}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="h-52"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.hourlyDistribution}
            margin={{ top: 5, right: 5, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tick={{ fill: "#535353", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(h: number) => `${h}h`}
              interval={3}
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
                fontSize: "12px",
              }}
              formatter={(value) => [`${value} plays`, ""]}
              labelFormatter={(h) => `${h}:00 – ${h}:59`}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#14B8A6"
              strokeWidth={2}
              fill="url(#hourGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}