"use client";

import React, { useState } from "react";
import { Box, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Praktikum 3D", href: "#scrolly-lab" },
    { label: "Simulasi Kimia", href: "#simulasi-kimia" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b1a47] border-b border-[#c8952c]/40 text-white shadow-md">
      {/* Top micro-bar */}
      <div className="bg-[#06112e] text-[11px] px-4 py-1 border-b border-white/10 flex justify-between items-center text-[#e9c46a]">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider tech-font uppercase">
            PRAKTIKUM KIMIA: TITRASI • BUFFER • UJI NYALA
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8952c] animate-pulse"></span>
          <span className="text-white/80">13 Model 3D FBX</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="#beranda" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#13296b] to-[#0b1a47] border border-[#c8952c] flex items-center justify-center text-[#e9c46a] font-bold text-sm tech-font">
            ⚗
          </div>
          <div>
            <span className="text-xs sm:text-sm tracking-wider uppercase font-black text-white block leading-tight">
              LAB KIMIA <span className="text-[#e9c46a]">3D</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-[#e9c46a] transition-colors py-1 font-semibold tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="#scrolly-lab"
            className="px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider text-[#0b1a47] bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c] hover:brightness-110 shadow-sm transition-all flex items-center gap-1"
          >
            <Box className="w-3.5 h-3.5" />
            Mulai 3D
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1.5 rounded hover:bg-white/10"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1a47] border-b border-[#c8952c]/30 px-4 pt-2 pb-3 space-y-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-white/80 hover:text-[#e9c46a] text-xs font-medium border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#scrolly-lab"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-2 py-2 rounded text-xs font-bold uppercase tracking-wider text-[#0b1a47] bg-gradient-to-r from-[#9a6b17] via-[#e9c46a] to-[#c8952c]"
          >
            Mulai 3D
          </a>
        </div>
      )}
    </header>
  );
}
