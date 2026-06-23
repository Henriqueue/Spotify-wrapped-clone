"use client";

import { useState, useRef, DragEvent } from "react";
import { motion } from "motion/react";

interface UploadZoneProps {
  onFile: (file: File) => void;
  onSampleData: () => void;
  isLoading?: boolean;
}

export function UploadZone({ onFile, onSampleData, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      onFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg text-center"
      >
        {/* Logo / título */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-white mb-3">
            Your Wrapped
          </h1>
          <p className="text-spotify-lightgray text-lg">
            Importe seu histórico do Last.fm e veja seu ano em músicas
          </p>
        </motion.div>

        {/* Drop Zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-2xl p-12 cursor-pointer
            transition-all duration-300 mb-6
            ${isDragging
              ? "border-spotify-green bg-spotify-green/10 scale-105"
              : "border-spotify-gray hover:border-spotify-green hover:bg-white/5"
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
              <p className="text-spotify-lightgray">Processando seu histórico...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl mb-2">🎵</div>
              <p className="text-white font-medium text-lg">
                {isDragging ? "Solte aqui!" : "Arraste seu CSV aqui"}
              </p>
              <p className="text-spotify-lightgray text-sm">
                ou clique para selecionar o arquivo
              </p>
              <p className="text-spotify-gray text-xs mt-2">
                Exporte em mainstream.ghan.nl/export.html
              </p>
            </div>
          )}
        </motion.div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-spotify-gray/40" />
          <span className="text-spotify-gray text-sm">ou</span>
          <div className="flex-1 h-px bg-spotify-gray/40" />
        </div>

        {/* Botão de dados de exemplo */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onSampleData}
          className="w-full py-3 px-6 rounded-full border border-spotify-gray text-spotify-lightgray
                     hover:border-white hover:text-white transition-all duration-200 text-sm font-medium"
        >
          Ver com dados de exemplo
        </motion.button>
      </motion.div>
    </div>
  );
}