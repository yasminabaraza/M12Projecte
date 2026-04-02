"use client";
import Navbar from "@/components/layout/Navbar";

function AjudaPage() {
  return (
    <main className="min-h-screen bg-[#010d16] text-cyan-50 font-mono flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-black tracking-widest text-cyan-400">
          AJUDA
        </h1>
        <p className="text-xs text-cyan-800 tracking-widest uppercase">
          — Contingut d&apos;ajuda pròximament —
        </p>
      </div>
    </main>
  );
}
export default AjudaPage;
