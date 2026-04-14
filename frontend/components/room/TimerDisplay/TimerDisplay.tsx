import useGameTimer from "@/hooks/useGameTimer";

const TimerDisplay = () => {
  const { formattedTime, timeRemaining, isExpired } = useGameTimer();

  const colorClass = isExpired
    ? "text-red-500"
    : timeRemaining < 60
      ? "text-red-400 animate-pulse"
      : timeRemaining < 300
        ? "text-amber-400"
        : "text-cyan-200";

  return (
    <div className="flex justify-between items-center">
      <span className="text-cyan-700 text-[9px] uppercase">Temps</span>
      <span className={`text-sm font-bold tracking-widest ${colorClass}`}>
        {formattedTime}
      </span>
    </div>
  );
};

export default TimerDisplay;
