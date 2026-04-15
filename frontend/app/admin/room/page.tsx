"use client";

import { useEffect, useState } from "react";

// TIPOS LOCALES
type Puzzle = {
  id: number;
  title: string;
};

type Room = {
  id: number;
  name: string;
  puzzle?: Puzzle;
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/admin/rooms")
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  return (
    <div>
      <h1>Salas</h1>

      {rooms.map((room) => (
        <div key={room.id}>
          <a href={`/admin/rooms/${room.id}`}>{room.name}</a>

          {/* opcional: mostrar info del puzzle */}
          {room.puzzle && <p>Puzzle: {room.puzzle.title}</p>}
        </div>
      ))}
    </div>
  );
}
