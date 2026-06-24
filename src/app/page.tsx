"use client";

import { useState, useRef } from "react";
import { useWrappedData } from "@/hooks/useWrappedData";
import { useScreenshot } from "@/hooks/useScreenshot";
import { UploadZone } from "@/components/ui/UploadZone";
import { SlideNav } from "@/components/ui/SlideNav";
import { ScreenshotButton } from "@/components/ui/ScreenshotButton";
import { SlideWrapper } from "@/components/slides/SlideWrapper";
import { SlideCover } from "@/components/slides/SlideCover";
import { SlideTopArtists } from "@/components/slides/SlideTopArtists";
import { SlideTopSongs } from "@/components/slides/SlideTopSongs";
import { SlideTopAlbums } from "@/components/slides/SlideTopAlbums";
import { SlideGenres } from "@/components/slides/SlideGenres";
import { SlideStats } from "@/components/slides/SlideStats";
import { SlideHourly } from "@/components/slides/SlideHourly";
import { SlideMonthlyArtist } from "@/components/slides/SlideMonthlyArtist";

const TOTAL_SLIDES = 8;
const SWIPE_THRESHOLD = 50;

// Títulos dos slides — usados no nome do arquivo salvo
const SLIDE_TITLES = [
  "cover",
  "top-artistas",
  "top-musicas",
  "top-albuns",
  "generos",
  "horarios",
  "artista-do-mes",
  "estatisticas",
];

export default function Home() {
  const { data, state, error, processFile, useSampleData, changeYear, reset } =
    useWrappedData();
  const { screenshotState, captureSlide } = useScreenshot();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const touchStartX = useRef<number | null>(null);

  const goNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setDirection("forward");
      setCurrentSlide((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setDirection("backward");
      setCurrentSlide((s) => s - 1);
    }
  };

  const handleReset = () => {
    setCurrentSlide(0);
    reset();
  };

  const handleYearChange = (year: string) => {
    setCurrentSlide(0);
    changeYear(year);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) delta > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const handleCapture = () => {
    captureSlide(SLIDE_TITLES[currentSlide]);
  };

  if (state === "idle" || state === "error") {
    return (
      <>
        <UploadZone onFile={processFile} onSampleData={useSampleData} isLoading={false} />
        {state === "error" && error && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-900/80 text-red-200 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
      </>
    );
  }

  if (state === "loading" || !data) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
          <p className="text-spotify-lightgray text-sm">Processando seu histórico...</p>
        </div>
      </div>
    );
  }

  const slides = [
    <SlideCover key="cover" data={data} />,
    <SlideTopArtists key="artists" data={data} />,
    <SlideTopSongs key="songs" data={data} />,
    <SlideTopAlbums key="albums" data={data} />,
    <SlideGenres key="genres" data={data} />,
    <SlideHourly key="hourly" data={data} />,
    <SlideMonthlyArtist key="monthly" data={data} />,
    <SlideStats key="stats" data={data} />,
  ];

  return (
    <main
      className="fixed inset-0 bg-spotify-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Badge "buscando imagens" */}
      {state === "enriching" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
                        bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-3 h-3 border border-spotify-green border-t-transparent rounded-full animate-spin" />
          <span className="text-spotify-lightgray text-xs">Buscando imagens...</span>
        </div>
      )}

      <div className="relative h-full max-w-sm mx-auto">

        {/* ── Área de captura ── o html2canvas vai fotografar exatamente isso */}
        <div
          id="slide-capture-area"
          className="relative h-full overflow-hidden pb-24"
        >
          <SlideWrapper
            slideKey={`slide-${currentSlide}-${data.year}`}
            direction={direction}
          >
            {slides[currentSlide]}
          </SlideWrapper>
        </div>

        {/* Botão de screenshot — posicionado sobre o slide, fora da área de captura */}
        <div className="absolute top-4 right-4 z-40">
          <ScreenshotButton
            onCapture={handleCapture}
            state={screenshotState}
          />
        </div>

        {/* Navegação */}
        <SlideNav
          current={currentSlide}
          total={TOTAL_SLIDES}
          onPrev={goPrev}
          onNext={goNext}
          onReset={handleReset}
          years={data.availableYears}
          selectedYear={data.year}
          onYearChange={handleYearChange}
          isEnriching={state === "enriching"}
        />
      </div>
    </main>
  );
}