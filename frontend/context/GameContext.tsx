"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { GameState } from "@/types/game";
import { saveGame } from "@/services/game/gameService";

type GameContextValue = {
  gameState: GameState;
  gameId: number;
  updateState: (partial: Partial<GameState>) => void;
  save: () => void;
  isSaving: boolean;
  lastSavedAt: Date | null;
};

const GameContext = createContext<GameContextValue | null>(null);

type GameProviderProps = {
  children: React.ReactNode;
  initialState: GameState;
  gameId: number;
};

/**
 * Proveeix l'estat mutable del joc a tots els components fills.
 *
 * Responsabilitats:
 * - Font única de veritat per al GameState (timer, score, hints, etc.)
 * - Auto-save periòdic cada 60 segons
 * - Funció save() per triggers explícits (resposta, pista, etc.)
 */
const GameProvider = ({
  children,
  initialState,
  gameId,
}: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const stateRef = useRef(gameState);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const updateState = useCallback((partial: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...partial }));
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await saveGame(gameId, stateRef.current);
      setLastSavedAt(new Date());
    } catch (err) {
      console.error("Error guardant progrés:", err);
    } finally {
      setIsSaving(false);
    }
  }, [gameId]);

  // Auto-save cada 60 segons
  useEffect(() => {
    const interval = setInterval(save, 60_000);
    return () => clearInterval(interval);
  }, [save]);

  return (
    <GameContext.Provider
      value={{ gameState, gameId, updateState, save, isSaving, lastSavedAt }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGameContext ha d'estar dins d'un GameProvider");
  }
  return ctx;
};

export { GameProvider, useGameContext };
