"use client";

import { useEffect, useRef } from "react";
import useAbandonGame from "@/hooks/useAbandonGame";
import useGameTimer from "@/hooks/useGameTimer";

/**
 * Quan el timer expira, marca la partida com abandonada al backend i mostra
 * un overlay fins que useRoom redirigeixi a /game-over. Dispara l'abandon
 * una sola vegada (useRef) per evitar múltiples PATCH concurrents.
 */
type TimeExpiredGuardProps = {
  gameId: number;
};

const TimeExpiredGuard = ({ gameId }: TimeExpiredGuardProps) => {
  const { isExpired } = useGameTimer();
  const abandon = useAbandonGame();
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (!isExpired || triggeredRef.current) return;
    triggeredRef.current = true;
    abandon.mutate({ gameId });
  }, [isExpired, gameId, abandon]);

  if (!isExpired) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
    >
      <div className="relative flex flex-col items-center gap-6 border border-red-500 bg-red-500/5 px-20 py-14 shadow-[0_0_60px_rgba(239,68,68,0.35)]">
        <div className="absolute -top-px left-0 h-px w-full bg-red-500 animate-pulse" />
        <div className="absolute -bottom-px left-0 h-px w-full bg-red-500 animate-pulse" />

        <div className="text-[10px] tracking-[0.6em] text-red-500/80 uppercase">
          SISTEMA
        </div>

        <div className="text-4xl font-black tracking-[0.3em] text-red-400">
          TEMPS ESGOTAT
        </div>

        <div className="text-[10px] tracking-[0.4em] text-red-500 uppercase animate-pulse">
          Missió fallida — registrant l'incident…
        </div>
      </div>
    </div>
  );
};

export default TimeExpiredGuard;
