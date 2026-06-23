"use client";

import { useState } from "react";
import { useWrappedData } from "@/hooks/useWrappedData";
import { UploadZone } from "@/components/ui/UploadZone";
import { SlideNav } from "@/components/ui/SlideNav";
import { SlideWrapper } from "@/components/slides/SlideWrapper";
import { SlideCover } from "@/components/slides/SlideCover";
import { SlideTopArtists } from "@/components/slides/SlideTopArtists";
import { SlideTopSongs } from "@/components/slides/SlideTopSongs";
import { SlideTopAlbums } from "@/components/slides/SlideTopAlbums";
import { SlideGenres } from "@/components/slides/SlideGenres";
import { SlideStats } from "@/components/slides/SlideStats";

const TOTAL_SLIDES = 6;

export default function Home() {
  const { data, state, error, processFile, useSampleData, reset } = useWrappedData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

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

  // Tela de upload / loading / erro
  if (state !== "ready" || !data) {
    return (
      <>
        <UploadZone
          onFile={processFile}
          onSampleData={useSampleData}
          isLoading={state === "loading"}
        />
        {state === "error" && error && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-900/80 text-red-200 
                          px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
      </>
    );
  }

  // Mapa de slides
  const slides = [
    <SlideCover key="cover" data={data} />,
    <SlideTopArtists key="artists" data={data} />,
    <SlideTopSongs key="songs" data={data} />,
    <SlideTopAlbums key="albums" data={data} />,
    <SlideGenres key="genres" data={data} />,
    <SlideStats key="stats" data={data} />,
  ];

  return (
    <main className="fixed inset-0 bg-spotify-black overflow-hidden">
      <div className="relative h-full max-w-sm mx-auto">
        {/* Container dos slides */}
        <div className="relative h-full overflow-hidden pb-20">
          <SlideWrapper
            slideKey={`slide-${currentSlide}`}
            direction={direction}
          >
            {slides[currentSlide]}
          </SlideWrapper>
        </div>

        {/* Navegação */}
        <SlideNav
          current={currentSlide}
          total={TOTAL_SLIDES}
          onPrev={goPrev}
          onNext={goNext}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}