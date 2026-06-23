"use client";

import { useState, useCallback } from "react";
import type { WrappedData, AppState } from "@/types";
import { parseCSV, processScrobbles } from "@/lib/parser";
import { sampleData } from "@/data/sample";

export function useWrappedData() {
  const [data, setData] = useState<WrappedData | null>(null);
  const [state, setState] = useState<AppState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Processa um arquivo CSV real
  const processFile = useCallback(async (file: File) => {
    setState("loading");
    setError(null);

    try {
      const scrobbles = await parseCSV(file);

      if (scrobbles.length === 0) {
        throw new Error("O arquivo CSV está vazio ou no formato incorreto.");
      }

      const wrapped = processScrobbles(scrobbles);
      setData(wrapped);
      setState("ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      setState("error");
    }
  }, []);

  // Usa os dados de exemplo (para dev/demo)
  const useSampleData = useCallback(() => {
    setData(sampleData);
    setState("ready");
  }, []);

  // Volta ao estado inicial
  const reset = useCallback(() => {
    setData(null);
    setState("idle");
    setError(null);
  }, []);

  return { data, state, error, processFile, useSampleData, reset };
}