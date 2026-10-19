import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollyChemistryLab from "@/components/ScrollyChemistryLab";
import TopicSimulators from "@/components/TopicSimulators";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1c2233]">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <ScrollyChemistryLab />
        <TopicSimulators />
      </main>
    </div>
  );
}
