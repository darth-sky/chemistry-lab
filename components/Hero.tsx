"use client";

import React from "react";
import { Box, MoveRight, Beaker, Flame, Droplets, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-navy-dark-banner text-white pt-12 pb-16 border-b border-[#c8952c]/30">
      {/* Background Molecular Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#c8952c 1px, transparent 1px), radial-gradient(#13296b 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#13296b] border border-[#c8952c]/40 text-[#e9c46a] text-xs font-bold uppercase tracking-wider tech-font mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#e9c46a]" />
          Laboratorium Kimia Virtual 3D
        </div>

        {/* 3D Big Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none my-4">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#eef4fb] to-[#9a6b17]">
            TITRASI • BUFFER
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#e9c46a] via-[#c8952c] to-[#9a6b17]">
            & UJI NYALA LOGAM
          </span>
        </h1>

        {/* Concise Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-[#eef4fb]/90 font-light mt-3 leading-relaxed">
          Eksplorasi langkah praktikum kimia dan fungsi 13 alat laboratorium 3D secara interaktif. 
          Model 3D berganti otomatis mengikuti scroll alur kerja Anda.
        </p>

        {/* Quick Topic Cards (Concise, Clickable) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
          <a
            href="#scrolly-lab"
            className="p-3.5 rounded-xl bg-[#0b1a47]/90 border border-[#c8952c]/40 hover:border-[#c8952c] hover:bg-[#13296b] transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#13296b] border border-[#c8952c]/50 flex items-center justify-center text-[#e9c46a] flex-shrink-0">
              <Beaker className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wide">1. Titrasi Asam-Basa</span>
              <span className="text-[11px] text-[#eef4fb]/70 block">Buret, Pipet Volume, Indikator PP</span>
            </div>
          </a>

          <a
            href="#scrolly-lab"
            className="p-3.5 rounded-xl bg-[#0b1a47]/90 border border-[#c8952c]/40 hover:border-[#c8952c] hover:bg-[#13296b] transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#13296b] border border-[#c8952c]/50 flex items-center justify-center text-[#e9c46a] flex-shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wide">2. Larutan Penyangga</span>
              <span className="text-[11px] text-[#eef4fb]/70 block">Botol Reagen, Neraca, Uji Kapasitas</span>
            </div>
          </a>

          <a
            href="#scrolly-lab"
            className="p-3.5 rounded-xl bg-[#0b1a47]/90 border border-[#c8952c]/40 hover:border-[#c8952c] hover:bg-[#13296b] transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#13296b] border border-[#c8952c]/50 flex items-center justify-center text-[#e9c46a] flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wide">3. Uji Nyala Logam</span>
              <span className="text-[11px] text-[#eef4fb]/70 block">Kawat Nikrom, Spatula, Lemari Asam</span>
            </div>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#scrolly-lab"
            className="px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider text-[#0b1a47] bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c] hover:brightness-110 shadow-md transition-all flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            Mulai Alur Praktikum 3D
          </a>
          <a
            href="#simulasi-kimia"
            className="px-5 py-2.5 rounded-lg font-semibold text-xs tracking-wide text-white bg-[#13296b] hover:bg-[#13296b]/80 border border-white/20 transition-all flex items-center gap-1.5"
          >
            Buka Simulasi Interaktif
            <MoveRight className="w-3.5 h-3.5 text-[#e9c46a]" />
          </a>
        </div>
      </div>
    </section>
  );
}
