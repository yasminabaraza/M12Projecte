import type { Room, InteractiveObject } from "@/types/game";
import ObjectPanel from "@/components/room/ObjectPanel/ObjectPanel";

type HudPanelProps = {
  room: Room;
  selectedObject: InteractiveObject | null;
};

const TOTAL_ROOMS = 3;

const HudPanel = ({ room, selectedObject }: HudPanelProps) => {
  return (
    <aside className="w-80 bg-[#040e15] border-l border-cyan-800/40 flex flex-col p-4 space-y-4 text-xs font-mono">
      {/* Sala */}
      <div>
        <div className="uppercase tracking-widest text-cyan-500">
          Sala {room.order}/{String(TOTAL_ROOMS).padStart(2, "0")}
        </div>
        <div className="text-cyan-200 text-[11px] mt-1">{room.name}</div>
      </div>

      {/* Timer slot - Per definir en una futura PR*/}

      {/* Objecte seleccionat */}
      <ObjectPanel object={selectedObject} />

      {/* Enigma */}
      {room.puzzle && (
        <div className="border-t border-cyan-700/30 pt-2">
          <div className="text-cyan-500 uppercase tracking-widest mb-2">
            Enigma
          </div>
          <div className="text-cyan-200 text-[11px]">
            {room.puzzle.statement}
          </div>
          {/* PuzzlePanel slot — PR3 */}
        </div>
      )}

      {/* Pistes slot — PR3 */}
    </aside>
  );
};

export default HudPanel;
