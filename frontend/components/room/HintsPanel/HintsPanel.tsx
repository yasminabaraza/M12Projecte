"use client";

import { useState } from "react";
import useRequestHint from "@/hooks/useRequestHint";

type HintsPanelProps = {
  gameId: number;
  hintsUsed: number;
  maxHints: number;
};

const HintsPanel = ({ gameId, hintsUsed, maxHints }: HintsPanelProps) => {
  const [revealedHints, setRevealedHints] = useState<string[]>([]);
  const [currentHintsUsed, setCurrentHintsUsed] = useState(hintsUsed);
  const { mutate, isPending } = useRequestHint();

  const hintsRemaining = maxHints - currentHintsUsed;
  const canRequestHint = hintsRemaining > 0;

  const handleRequestHint = () => {
    if (!canRequestHint || isPending) return;

    mutate(
      { gameId },
      {
        onSuccess: (data) => {
          setRevealedHints((prev) => [...prev, data.hint]);
          setCurrentHintsUsed(data.hintsUsed);
        },
      },
    );
  };

  return (
    <div className="border-t border-cyan-700/30 pt-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-cyan-500 uppercase tracking-widest">Pistes</div>
        <div className="text-cyan-700 text-[10px]">
          {currentHintsUsed}/{maxHints}
        </div>
      </div>

      {revealedHints.length > 0 && (
        <ul className="list-disc ml-4 text-cyan-200 text-[11px] mb-2">
          {revealedHints.map((hint, i) => (
            <li key={i}>{hint}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleRequestHint}
        disabled={!canRequestHint || isPending}
        className="w-full border border-cyan-800 py-1.5 text-[10px] uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isPending
          ? "CARREGANT..."
          : canRequestHint
            ? `DEMANAR PISTA (-100 pts)`
            : "SENSE PISTES"}
      </button>
    </div>
  );
};

export default HintsPanel;
