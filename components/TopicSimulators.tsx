"use client";

import React, { useState } from "react";
import { Beaker, Droplets, Flame, RotateCcw, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function TopicSimulators() {
  const [activeSim, setActiveSim] = useState<"titrasi" | "penyangga" | "uji-nyala">("titrasi");

  // State Simulasi 1: Titrasi Asam-Basa
  const [titranVolume, setTitranVolume] = useState<number>(20.0); // mL NaOH
  // Hitung perkiraan pH titrasi 25 mL HCl 0.1 M dengan NaOH 0.1 M (Titik ekuivalen di 25.0 mL)
  const calcPH = () => {
    const vAcid = 25.0;
    const cAcid = 0.1;
    const cBase = 0.1;
    const molAcid = (vAcid * cAcid) / 1000;
    const molBase = (titranVolume * cBase) / 1000;
    const totalVol = (vAcid + titranVolume) / 1000;

    if (titranVolume < 25.0) {
      const remAcid = molAcid - molBase;
      const hConc = remAcid / totalVol;
      return Math.max(1.0, -Math.log10(hConc)).toFixed(2);
    } else if (titranVolume === 25.0) {
      return "7.00";
    } else {
      const remBase = molBase - molAcid;
      const ohConc = remBase / totalVol;
      const pOH = -Math.log10(ohConc);
      return Math.min(13.0, 14 - pOH).toFixed(2);
    }
  };

  const currentPH = parseFloat(calcPH());
  // Warna larutan fenolftalein
  const getErlenmeyerColor = () => {
    if (currentPH < 8.2) return "bg-sky-50/70 border-sky-200 text-sky-900"; // Bening
    if (currentPH >= 8.2 && currentPH <= 9.0) return "bg-pink-300/80 border-pink-400 text-pink-950"; // Merah muda seulas (titik akhir ideal!)
    return "bg-fuchsia-600/90 border-fuchsia-700 text-white"; // Terlalu merah / kelebihan basa
  };

  // State Simulasi 2: Buffer
  const [bufferTetes, setBufferTetes] = useState<number>(0);
  const [addedType, setAddedType] = useState<"acid" | "base">("acid");

  const bufferPH = () => {
    // Henderson-Hasselbalch pKa asam asetat = 4.74
    if (addedType === "acid") {
      return Math.max(4.55, 4.74 - bufferTetes * 0.03).toFixed(2);
    } else {
      return Math.min(4.95, 4.74 + bufferTetes * 0.03).toFixed(2);
    }
  };

  const waterPH = () => {
    if (bufferTetes === 0) return "7.00";
    if (addedType === "acid") {
      return Math.max(2.1, 7.0 - bufferTetes * 1.2).toFixed(2);
    } else {
      return Math.min(12.5, 7.0 + bufferTetes * 1.2).toFixed(2);
    }
  };

  // State Simulasi 3: Uji Nyala Kation Logam
  const [selectedFlameMetal, setSelectedFlameMetal] = useState<number>(0);

  const flameMetals = [
    {
      name: "Natrium (Na⁺)",
      flameColorName: "Kuning Emas Terang",
      wavelength: "589 nm",
      glowColor: "rgba(255, 204, 0, 0.95)",
      bgTailwind: "from-amber-400 via-yellow-300 to-yellow-500",
      description: "Emisi doublet garis D sangat peka dan intens; warna kuning khas garam dapur (NaCl).",
    },
    {
      name: "Kalium (K⁺)",
      flameColorName: "Ungu Lilac / Lembayung",
      wavelength: "766 nm",
      glowColor: "rgba(190, 110, 255, 0.95)",
      bgTailwind: "from-purple-400 via-fuchsia-300 to-purple-600",
      description: "Spektrum ungu muda lembut; biasanya diamati menggunakan kaca kobalt biru untuk menyerap emisi natrium.",
    },
    {
      name: "Tembaga (Cu²⁺)",
      flameColorName: "Hijau Toska / Biru Kehijauan",
      wavelength: "510 nm",
      glowColor: "rgba(0, 230, 180, 0.95)",
      bgTailwind: "from-teal-400 via-emerald-300 to-cyan-500",
      description: "Eksitasi orbital d pada ion tembaga klorida menghasilkan kilatan hijau zamrud toska yang khas.",
    },
    {
      name: "Barium (Ba²⁺)",
      flameColorName: "Hijau Apel Kekuningan",
      wavelength: "554 nm",
      glowColor: "rgba(160, 230, 40, 0.95)",
      bgTailwind: "from-lime-400 via-green-300 to-lime-500",
      description: "Warna hijau apel muda yang umum dipakai dalam kembang api hijau; senyawa barium beracun.",
    },
    {
      name: "Kalsium (Ca²⁺)",
      flameColorName: "Merah Jingga Bata",
      wavelength: "622 nm",
      glowColor: "rgba(255, 90, 30, 0.95)",
      bgTailwind: "from-orange-500 via-amber-400 to-red-500",
      description: "Transisi spektroskopi menghasilkan warna merah jingga seperti batu bata terbakar.",
    },
    {
      name: "Stronsium (Sr²⁺)",
      flameColorName: "Merah Karmin Menyala",
      wavelength: "606 nm",
      glowColor: "rgba(255, 20, 70, 0.95)",
      bgTailwind: "from-rose-500 via-red-400 to-red-600",
      description: "Merah tua kirmizi cerah; digunakan dalam suar darurat (flares) dan kembang api merah menyala.",
    },
  ];

  return (
    <section id="simulasi-kimia" className="py-20 bg-[#f8fafc] border-b border-[#d5dbe6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#eef4fb] border border-[#c8952c]/50 text-[#9a6b17] text-xs font-bold uppercase tracking-wider tech-font mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#13296b]" />
            Laboratorium Interaktif • Coba Konsep Langsung
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#13296b] tracking-tight leading-tight">
            Simulasi Interaktif 3 Topik Kimia
          </h2>
          <p className="text-sm sm:text-base text-[#5f6678] mt-2 leading-relaxed">
            Eksperimen langsung di browser: Amati perubahan warna titik akhir titrasi, uji ketahanan larutan penyangga, 
            dan nyalakan pembakar kation logam untuk melihat spektrum emisi atom.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveSim("titrasi")}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeSim === "titrasi"
                ? "bg-[#13296b] text-white border-2 border-[#c8952c] shadow-md ring-2 ring-[#c8952c]/30"
                : "bg-white text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Beaker className="w-4 h-4 text-[#e9c46a]" />
            Simulasi Titrasi (Geser Buret)
          </button>

          <button
            onClick={() => setActiveSim("penyangga")}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeSim === "penyangga"
                ? "bg-[#13296b] text-white border-2 border-[#c8952c] shadow-md ring-2 ring-[#c8952c]/30"
                : "bg-white text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Droplets className="w-4 h-4 text-[#e9c46a]" />
            Simulasi Buffer vs Air Murni
          </button>

          <button
            onClick={() => setActiveSim("uji-nyala")}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeSim === "uji-nyala"
                ? "bg-[#13296b] text-white border-2 border-[#c8952c] shadow-md ring-2 ring-[#c8952c]/30"
                : "bg-white text-[#1c2233] border border-[#d5dbe6] hover:border-[#c8952c]"
            }`}
          >
            <Flame className="w-4 h-4 text-[#e9c46a]" />
            Simulasi Uji Nyala Kation Logam
          </button>
        </div>

        {/* ================= SIMULASI 1: TITRASI ASAM-BASA ================= */}
        {activeSim === "titrasi" && (
          <div className="bg-[#0b1a47] rounded-2xl border-2 border-[#c8952c] p-6 sm:p-10 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Kolom Slider & Kontrol */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] text-[#e9c46a] uppercase font-bold tracking-widest tech-font block">
                    Alat Terlibat: Buret 50 mL + Statif & Klem + Pipet Tetes PP
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Kendali Kran Buret Titran (NaOH 0.1 M)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#eef4fb]/80 mt-1">
                    Geser slider di bawah untuk mensimulasikan pembukaan kran buret dan penambahan volume titran ke dalam 25.0 mL sampel HCl 0.1 M.
                  </p>
                </div>

                {/* Slider Kran Buret */}
                <div className="bg-[#06112e] p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs tech-font">
                    <span className="text-white/70">Volume Titran Ditambahkan:</span>
                    <span className="text-[#e9c46a] font-bold text-lg">{titranVolume.toFixed(1)} mL</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={titranVolume}
                    onChange={(e) => setTitranVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#13296b] rounded-lg appearance-none cursor-pointer accent-[#c8952c]"
                  />

                  <div className="flex justify-between text-[10px] text-white/50 tech-font">
                    <span>0.0 mL (Awal Asam)</span>
                    <span className="text-[#e9c46a] font-bold">25.0 mL (Titik Ekuivalen)</span>
                    <span>50.0 mL (Kelebihan Basa)</span>
                  </div>
                </div>

                {/* Status Pembelajaran */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#13296b]/80 border border-[#c8952c]/30">
                    <span className="text-[10px] text-white/60 block tech-font">Nilai pH Terhitung:</span>
                    <span className="text-2xl font-black text-[#e9c46a] block mt-0.5">{calcPH()}</span>
                    <span className="text-[10px] text-white/70">
                      {currentPH < 7 ? "Suasana Asam (Kelebihan H⁺)" : currentPH === 7 ? "Netral (Titik Ekuivalen)" : "Suasana Basa (Kelebihan OH⁻)"}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#13296b]/80 border border-[#c8952c]/30">
                    <span className="text-[10px] text-white/60 block tech-font">Kondisi Indikator PP:</span>
                    <span className="text-sm font-bold text-white block mt-1">
                      {currentPH < 8.2 ? "Bening Tak Berwarna" : currentPH <= 9.0 ? "🌸 Merah Muda Seulas (Sempurna!)" : "🌺 Merah Tua / Magenta"}
                    </span>
                    <span className="text-[10px] text-[#eef4fb]/60">
                      {currentPH < 8.2 ? "Belum capai titik akhir" : currentPH <= 9.0 ? "Hentikan titrasi tepat di sini!" : "Terlewat (Over-titrated)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTitranVolume(25.0)}
                    className="px-3 py-1.5 rounded bg-[#13296b] hover:bg-[#13296b]/80 border border-[#c8952c]/50 text-xs font-bold text-[#e9c46a] tech-font"
                  >
                    Loncat ke Titik Ekuivalen (25.0 mL)
                  </button>
                  <button
                    onClick={() => setTitranVolume(0.0)}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-white tech-font flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Kolom Visualisasi Wadah Erlenmeyer Titrasi */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#06112e] rounded-xl border border-white/10 relative">
                <span className="text-xs text-[#e9c46a] uppercase font-bold tech-font mb-4">
                  Visual Labu Erlenmeyer di Bawah Buret
                </span>

                {/* Simulated Glass Flask with Liquid Color */}
                <div className="relative w-44 h-56 flex flex-col items-center justify-end">
                  {/* Leher Labu */}
                  <div className="w-12 h-16 border-2 border-white/30 border-b-0 rounded-t-sm bg-white/5"></div>
                  {/* Badan Segitiga Labu */}
                  <div className={`w-40 h-36 border-2 border-white/40 rounded-b-3xl transition-all duration-300 p-3 flex flex-col justify-end items-center shadow-inner ${getErlenmeyerColor()}`}>
                    <span className="text-xs font-bold tracking-tight mb-2 text-center drop-shadow">
                      {currentPH < 8.2 ? "Tak Berwarna (pH < 8.2)" : currentPH <= 9.0 ? "Titik Akhir Tercapai!" : "Kelebihan Titran Basa"}
                    </span>
                    <div className="w-full text-center text-[10px] font-mono border-t border-black/10 pt-1">
                      pH = {calcPH()}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-white/60 text-center mt-4 italic max-w-xs">
                  "Titik akhir titrasi yang ideal dicapai saat larutan berubah menjadi merah muda seulas yang bertahan minimal 30 detik saat digoyangkan."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= SIMULASI 2: LARUTAN PENYANGGA (BUFFER) ================= */}
        {activeSim === "penyangga" && (
          <div className="bg-[#0b1a47] rounded-2xl border-2 border-[#c8952c] p-6 sm:p-10 text-white shadow-2xl">
            <div className="max-w-3xl mb-6">
              <span className="text-[10px] text-[#e9c46a] uppercase font-bold tracking-widest tech-font block">
                Alat Terlibat: Tabung Reaksi + Botol Reagen Amber + Kaca Arloji
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Uji Daya Tahan Buffer (Penyangga) vs Air Murni
              </h3>
              <p className="text-xs sm:text-sm text-[#eef4fb]/80 mt-1">
                Buktikan secara eksperimen bahwa larutan penyangga mampu mempertahankan pH dari lonjakan drastis saat ditambahkan asam kuat (HCl) atau basa kuat (NaOH).
              </p>
            </div>

            {/* Kontrol Penambahan Tetes */}
            <div className="bg-[#06112e] p-5 rounded-xl border border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/80 font-semibold">Jenis Reagen Ditambahkan:</span>
                <button
                  onClick={() => { setAddedType("acid"); setBufferTetes(0); }}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    addedType === "acid" ? "bg-red-600 text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  Asam Kuat (HCl 0.1 M)
                </button>
                <button
                  onClick={() => { setAddedType("base"); setBufferTetes(0); }}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    addedType === "base" ? "bg-blue-600 text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  Basa Kuat (NaOH 0.1 M)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBufferTetes((prev) => Math.min(prev + 1, 10))}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c] text-[#0b1a47] font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  + Tambah 1 Tetes (Sekarang: {bufferTetes} Tetes)
                </button>
                <button
                  onClick={() => setBufferTetes(0)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                  title="Reset Tetes"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Perbandingan 2 Tabung Reaksi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tabung A: Larutan Penyangga */}
              <div className="p-6 rounded-xl bg-[#13296b]/60 border-2 border-green-500/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tech-font bg-green-500/20 text-green-300 border border-green-500/40">
                      Tabung A: Buffer Asetat (CH3COOH + CH3COONa)
                    </span>
                    <span className="text-xs text-green-300 font-bold">Kapasitas Tinggi</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    pH Penyangga Stabil:
                  </h4>
                  <div className="text-4xl font-black text-green-400 font-mono my-2">
                    {bufferPH()}
                  </div>
                  <p className="text-xs text-[#eef4fb]/80 leading-relaxed">
                    Meskipun ditambahkan {bufferTetes} tetes zat {addedType === "acid" ? "asam" : "basa"}, ion konjugasi menyerap kelebihan ion sehingga nilai pH hampir tidak bergeser (hanya berubah ~0.03 unit).
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-green-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sistem penyangga berhasil menjaga homeostasis pH!</span>
                </div>
              </div>

              {/* Tabung B: Air Murni Kontrol */}
              <div className="p-6 rounded-xl bg-[#13296b]/60 border-2 border-red-500/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tech-font bg-red-500/20 text-red-300 border border-red-500/40">
                      Tabung B: Aquades Kontrol (Tanpa Buffer)
                    </span>
                    <span className="text-xs text-red-300 font-bold">Tidak Terlindungi</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    pH Air Murni Anjlok/Melonjak:
                  </h4>
                  <div className="text-4xl font-black text-red-400 font-mono my-2">
                    {waterPH()}
                  </div>
                  <p className="text-xs text-[#eef4fb]/80 leading-relaxed">
                    Tanpa adanya pasangan asam-basa konjugasi, penambahan {bufferTetes} tetes {addedType === "acid" ? "asam kuat" : "basa kuat"} langsung merusak kenetralan air hingga ke nilai ekstrem.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Rentan terhadap perubahan lingkungan kimiawi!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SIMULASI 3: UJI NYALA KATION LOGAM ================= */}
        {activeSim === "uji-nyala" && (
          <div className="bg-[#0b1a47] rounded-2xl border-2 border-[#c8952c] p-6 sm:p-10 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Pilihan Logam */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] text-[#e9c46a] uppercase font-bold tracking-widest tech-font block">
                    Alat Terlibat: Tabung Reaksi + Spatula + Kaca Arloji + Lemari Asam
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Spektrum Warna Uji Nyala Pembakar Bunsen
                  </h3>
                  <p className="text-xs sm:text-sm text-[#eef4fb]/80 mt-1">
                    Pilih kation garam logam di bawah ini untuk mengamati foton warna emisi khas saat kawat nikrom dipanaskan pada nyala api oksidasi:
                  </p>
                </div>

                {/* Grid 6 Kation Logam */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {flameMetals.map((metal, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFlameMetal(idx)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedFlameMetal === idx
                          ? "bg-[#13296b] border-[#c8952c] ring-2 ring-[#c8952c]/40 text-white font-bold"
                          : "bg-[#06112e] border-white/10 text-white/80 hover:border-[#c8952c]"
                      }`}
                    >
                      <span className="text-xs block font-bold truncate">{metal.name}</span>
                      <span className="text-[10px] text-[#e9c46a] block mt-0.5 truncate">{metal.flameColorName}</span>
                    </button>
                  ))}
                </div>

                {/* Detail Fisika Kuantum Eksitasi */}
                <div className="p-4 rounded-xl bg-[#06112e] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs tech-font">
                    <span className="text-[#e9c46a] font-bold">Panjang Gelombang Emisi (λ):</span>
                    <span className="text-white font-bold">{flameMetals[selectedFlameMetal].wavelength}</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {flameMetals[selectedFlameMetal].description}
                  </p>
                </div>
              </div>

              {/* Visual Nyala Api Pembakar Bunsen */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#06112e] rounded-xl border border-white/10 relative overflow-hidden">
                <span className="text-xs text-[#e9c46a] uppercase font-bold tech-font mb-6">
                  Warna Nyala Api: {flameMetals[selectedFlameMetal].name}
                </span>

                {/* Simulasi Api Glow */}
                <div className="relative w-36 h-48 flex flex-col items-center justify-end">
                  {/* Efek Nyala Api Dinamis */}
                  <div
                    className={`w-24 h-36 rounded-t-full bg-gradient-to-t ${flameMetals[selectedFlameMetal].bgTailwind} animate-pulse blur-[1px] shadow-2xl`}
                    style={{
                      boxShadow: `0 0 60px 20px ${flameMetals[selectedFlameMetal].glowColor}`,
                    }}
                  />
                  {/* Inti Api Biru Dasar */}
                  <div className="absolute bottom-6 w-8 h-12 bg-blue-400 rounded-t-full opacity-80 blur-[2px]" />
                  {/* Pipa Burner Logam */}
                  <div className="w-10 h-10 bg-zinc-600 border border-zinc-400 rounded-b-md z-10" />
                </div>

                <div className="mt-6 text-center">
                  <span className="text-sm font-black text-white block">
                    {flameMetals[selectedFlameMetal].flameColorName}
                  </span>
                  <span className="text-[10px] text-white/60 block tech-font mt-0.5">
                    Transisi Elektronik ΔE = h · c / λ
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

