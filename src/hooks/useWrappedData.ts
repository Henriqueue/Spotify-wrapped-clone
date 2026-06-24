"use client";

import { useState, useCallback, useRef } from "react";
import type { WrappedData, AppState, ScrobbleRaw } from "@/types";
import { parseCSV, processScrobbles, getAvailableYears } from "@/lib/parser";
import { enrichWithImages } from "@/lib/lastfm";
import { sampleData } from "@/data/sample";

export function useWrappedData() {
  const [data, setData] = useState<WrappedData | null>(null);
  const [state, setState] = useState<AppState>("idle");
  const [error, setError] = useState<string | null>(null);
  // Guarda todos os scrobbles brutos para trocar de ano sem re-upload
  const allScrobblesRef = useRef<ScrobbleRaw[]>([]);

  const processAndEnrich = useCallback(
    async (scrobbles: ScrobbleRaw[], year: string) => {
      const wrapped = processScrobbles(scrobbles, year);
      setData(wrapped);
      setState("enriching");
      try {
        const images = await enrichWithImages(wrapped);
        setData((prev) => (prev ? { ...prev, ...images } : prev));
      } catch {
        // silencioso — mostra sem imagens
      }
      setState("ready");
    },
    []
  );

  const processFile = useCallback(
    async (file: File) => {
      setState("loading");
      setError(null);
      try {
        const scrobbles = await parseCSV(file);
        if (scrobbles.length === 0)
          throw new Error("CSV vazio ou formato incorreto.");
        allScrobblesRef.current = scrobbles;
        const years = getAvailableYears(scrobbles);
        await processAndEnrich(scrobbles, years[0]); // começa pelo ano mais recente
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setState("error");
      }
    },
    [processAndEnrich]
  );

  // Troca de ano sem re-upload do arquivo
  const changeYear = useCallback(
    async (year: string) => {
      if (allScrobblesRef.current.length === 0) return;
      setState("enriching");
      await processAndEnrich(allScrobblesRef.current, year);
    },
    [processAndEnrich]
  );

  const useSampleData = useCallback(async () => {
    setState("enriching");
    setData(sampleData);
    try {
      const images = await enrichWithImages(sampleData);
      setData((prev) => (prev ? { ...prev, ...images } : prev));
    } catch {
      // silencioso
    }
    setState("ready");
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setState("idle");
    setError(null);
    allScrobblesRef.current = [];
  }, []);

  return { data, state, error, processFile, useSampleData, changeYear, reset };
}