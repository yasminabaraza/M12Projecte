"use client";

import { useEffect, useState } from "react";
import { useGameContext } from "@/context/GameContext";

const SaveIndicator = () => {
  const { isSaving, lastSavedAt } = useGameContext();
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!lastSavedAt) return;

    setShowSaved(true);
    const timeout = setTimeout(() => setShowSaved(false), 2000);
    return () => clearTimeout(timeout);
  }, [lastSavedAt]);

  if (isSaving) {
    return (
      <div className="text-cyan-700 text-[9px] tracking-widest animate-pulse">
        GUARDANT...
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="text-green-700 text-[9px] tracking-widest transition-opacity">
        PROGRÉS DESAT
      </div>
    );
  }

  return null;
};

export default SaveIndicator;
