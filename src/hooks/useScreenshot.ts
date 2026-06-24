"use client";

import { useCallback, useState } from "react";

type ScreenshotState = "idle" | "capturing" | "done" | "error";

export function useScreenshot() {
  const [screenshotState, setScreenshotState] = useState<ScreenshotState>("idle");

  const captureSlide = useCallback(async (slideTitle: string) => {
    setScreenshotState("capturing");

    try {
      // Importação dinâmica — só carrega quando o usuário clicar
      const html2canvas = (await import("html2canvas-pro")).default;

      // Captura o container do slide atual
      const element = document.getElementById("slide-capture-area");
      if (!element) throw new Error("Elemento não encontrado");

      const canvas = await html2canvas(element, {
        backgroundColor: "#121212",  // fundo preto do Spotify
        scale: 2,                     // resolução 2x para ficar nítido no mobile
        useCORS: true,                // necessário para imagens externas (Last.fm, Wikipedia)
        allowTaint: false,
        logging: false,
      });

      // Converte para PNG e dispara o download
      const link = document.createElement("a");
      link.download = `lastfm-wrapped-${slideTitle.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setScreenshotState("done");
      // Volta ao idle após 2s para o botão resetar
      setTimeout(() => setScreenshotState("idle"), 2000);
    } catch (err) {
      console.error("Erro ao capturar screenshot:", err);
      setScreenshotState("error");
      setTimeout(() => setScreenshotState("idle"), 2000);
    }
  }, []);

  return { screenshotState, captureSlide };
}