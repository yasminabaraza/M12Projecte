"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  drift: number;
  speed: number;
}

const createParticles = (): Particle[] => {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    opacity: 0.15 + Math.random() * 0.45,
    drift: (Math.random() - 0.5) * 0.03,
    speed: 0.02 + Math.random() * 0.04,
  }));
};

const FloatingDust = () => {
  const [particles, setParticles] = useState<Particle[]>(createParticles);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((p) =>
        p.map((pt) => ({
          ...pt,
          x: pt.x + pt.drift,
          y: pt.y - pt.speed > -2 ? pt.y - pt.speed : 102,
        })),
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: "rgba(100, 220, 255, 0.8)",
            boxShadow: `0 0 ${p.size * 2}px rgba(100, 220, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingDust;
