"use client";

import { useCallback, useEffect, useState } from "react";
import useAbandonGame from "@/hooks/useAbandonGame";

/**
 * Botó per abandonar la partida activa des del HudPanel. Demana confirmació
 * en un modal abans d'enviar el PATCH. Si l'usuari confirma, useRoom detecta
 * el canvi de status a la cache i redirigeix a /game-over.
 */
type AbandonGameButtonProps = {
  gameId: number;
};

const AbandonGameButton = ({ gameId }: AbandonGameButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending } = useAbandonGame();

  const closeModal = useCallback(() => {
    if (isPending) return;
    setIsOpen(false);
    setErrorMessage(null);
  }, [isPending]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  const handleConfirm = () => {
    if (isPending) return;
    setErrorMessage(null);
    mutate(
      { gameId },
      {
        onError: () => {
          setErrorMessage(
            "No s'ha pogut abandonar la missió. Torna-ho a intentar.",
          );
        },
      },
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 border border-red-900/60 py-1.5 text-[10px] uppercase tracking-widest text-red-700 hover:border-red-500 hover:text-red-400 transition"
      >
        ABANDONAR MISSIÓ
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="abandon-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative flex flex-col gap-5 border border-red-500 bg-[#0b0d12] px-10 py-8 max-w-md w-[90%] shadow-[0_0_40px_rgba(239,68,68,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] tracking-[0.6em] text-red-500/80 uppercase">
              CONFIRMACIÓ REQUERIDA
            </div>

            <h2
              id="abandon-title"
              className="text-2xl font-black tracking-[0.2em] text-red-400 uppercase"
            >
              Abandonar missió?
            </h2>

            <p className="text-sm text-cyan-200/80 leading-relaxed">
              Si abandones, perdràs tot el progrés d'aquesta partida. Hauràs de
              començar una nova missió des de zero.
            </p>

            {errorMessage && (
              <p
                role="alert"
                className="text-[10px] text-red-400 tracking-widest uppercase"
              >
                {errorMessage}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={isPending}
                className="flex-1 border border-cyan-700 py-2 text-[10px] uppercase tracking-widest text-cyan-400 hover:border-cyan-400 transition disabled:opacity-40"
              >
                Cancel·lar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 border border-red-500 bg-red-500/10 py-2 text-[10px] uppercase tracking-widest text-red-400 font-bold hover:bg-red-500 hover:text-black transition disabled:opacity-40 disabled:cursor-wait"
              >
                {isPending ? "Abandonant..." : "Sí, abandonar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AbandonGameButton;
