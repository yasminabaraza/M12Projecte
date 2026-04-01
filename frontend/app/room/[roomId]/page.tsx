"use client";

import Navbar from "@/components/layout/Navbar";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
  const { roomId } = useParams();

  const [time] = useState("16:07");
  const [attempts, setAttempts] = useState(3);
  const [oxygen, setOxygen] = useState(17);
  const [pressure,setPressure ] = useState(420);
  const [energy, setEnergy] = useState(34);
  const [clues, setClues] = useState([
    "El codi té 4 dígits",
    "La profunditat de l'estació és 4.200 metres",
  ]);
  const [enigmaInput, setEnigmaInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);

  const verifyCode = () => {
    const isCorrect = enigmaInput === "4200";

    setFeedback(isCorrect ? "correct" : "wrong");

    setAttempts((prev) => prev + 1);
    setOxygen((prev) => Math.max(prev - 5, 0));
    setEnergy((prev) => Math.max(prev - 10, 0));
    setPressure((prev) => Math.max(prev - 20, 0));

    setClues((prev) => [
      ...prev,
      `Intent ${attempts + 1}: ${enigmaInput} → ${
        isCorrect ? "✔ Correcte" : "✖ Incorrecte"
      }`,
    ]);

    setEnigmaInput("");
  };

  const objectDescriptions: Record<string, string> = {
    terminal:
      "Terminal A mostra registres amb anomalies. Valor destacat: DEPTH = 4200",
    panel:
      "Panell amb sistemes crítics. Oxigen baix i energia limitada.",
    door: "Porta bloquejada. Necessites un codi de 4 dígits.",
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#030d14] text-cyan-400">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] flex-1">

        {/* ========================= */}
        {/* SCENE */}
        {/* ========================= */}
        <div className="relative overflow-hidden">

          {/* Background ambience */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,50,80,0.3),transparent)]" />

          {/* ROOM SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-80"
            viewBox="0 0 800 600"
          >
            <rect width="800" height="600" fill="#020a10" />

            {/* Door */}
            <rect x="330" y="180" width="140" height="280" fill="#050f16" stroke="#00e5ff33" />
            <text x="400" y="360" textAnchor="middle" fill="#ff3333">
              BLOQUEJAT
            </text>

            {/* Terminal */}
            <rect x="60" y="100" width="180" height="300" fill="#071926" stroke="#00e5ff33" />
            <text x="150" y="120" textAnchor="middle" fill="#00e5ff">
              TERMINAL A
            </text>

            {/* Panel */}
            <rect x="560" y="80" width="200" height="360" fill="#071926" stroke="#ffaa0033" />
            <text x="660" y="100" textAnchor="middle" fill="#ffaa00">
              PANEL
            </text>
          </svg>

          {/* INTERACTIVE OBJECTS */}
          {[
            { id: "terminal", style: "left-[60px] top-[100px] w-[180px] h-[300px]" },
            { id: "panel", style: "left-[560px] top-[80px] w-[200px] h-[360px]" },
            { id: "door", style: "left-[330px] top-[180px] w-[140px] h-[280px]" },
          ].map((obj) => (
            <div
              key={obj.id}
              onClick={() => setSelectedObject(obj.id)}
              className={`absolute ${obj.style} cursor-pointer group`}
            >
              <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400 transition" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-cyan-400 blur-xl transition" />
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* HUD PANEL */}
        {/* ========================= */}
        <aside className="bg-[#04141f] border-l border-cyan-900 flex flex-col text-xs font-mono">

          {/* STATUS */}
          <div className="p-4 border-b border-cyan-900">
            <div className="text-[10px] tracking-widest text-cyan-500 mb-2">
              ► ESTAT MISSIÓ
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>Sala <span className="text-cyan-400">{roomId}/03</span></div>
              <div>Temps <span className="text-amber-400">{time}</span></div>
              <div>Intents <span>{attempts}</span></div>
              <div>O₂ <span className="text-red-400">{oxygen}%</span></div>
            </div>

            <div className="mt-3 h-0.75 bg-cyan-900">
              <div className="h-full bg-cyan-400 w-[12%]" />
            </div>
          </div>

          {/* INSPECTION */}
          <div className="p-4 border-b border-cyan-900">
            <div className="text-[10px] text-cyan-500 mb-2">► INSPECCIÓ</div>

            <div className="text-cyan-200 text-[11px] min-h-15">
              {selectedObject
                ? objectDescriptions[selectedObject]
                : "Selecciona un objecte..."}
            </div>
          </div>

          {/* CLUES */}
          <div className="p-4 border-b border-cyan-900">
            <div className="text-[10px] text-cyan-500 mb-2">► PISTES</div>

            {clues.length === 0 ? (
              <p className="text-cyan-700 italic">Cap pista...</p>
            ) : (
              clues.map((clue, i) => (
                <div key={i} className="text-[11px]">
                  ▶ {clue}
                </div>
              ))
            )}
          </div>

          {/* ENIGMA */}
          <div className="p-4 flex-1">
            <div className="text-[10px] text-cyan-500 mb-2">► ENIGMA</div>

            <p className="text-cyan-300 mb-3 text-[11px]">
              &quot;La clau és la profunditat en dígits&quot;
            </p>

            <input
              value={enigmaInput}
              onChange={(e) => setEnigmaInput(e.target.value)}
              maxLength={4}
              className="w-full mb-2 px-3 py-2 bg-black border border-cyan-800 text-center tracking-widest focus:border-cyan-400 outline-none"
              placeholder="0000"
            />

            <button
              onClick={verifyCode}
              className="w-full border border-cyan-400 py-2 hover:bg-cyan-400 hover:text-black transition"
            >
              ▶ VERIFICAR
            </button>

            {feedback && (
              <div
                className={`mt-2 text-xs px-2 py-1 border ${
                  feedback === "correct"
                    ? "text-green-400 border-green-400 bg-green-400/10"
                    : "text-red-400 border-red-400 bg-red-400/10"
                }`}
              >
                {feedback === "correct"
                  ? "✔ ACCÉS CONCEDIT"
                  : "✖ CODI INCORRECTE"}
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
