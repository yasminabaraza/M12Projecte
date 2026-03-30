"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavRoute {
  label: string;
  href?: string;
  onClick?: () => void;
  dropdown?: { label: string; href: string }[];
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticación (simulado)

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    router.push("/");
  };

  const isActive = (href?: string) =>
    href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false;

  let routesToRender: NavRoute[] = [];

  if (!loggedIn) {
    routesToRender = [
      { label: "Inici", href: "/" },
      { label: "Entrar", onClick: () => router.push("/narrative") },
    ];
  } else {
    routesToRender = [
      { label: "Narrativa", href: "/narrative" },
      {
        label: "Salas",
        dropdown: [
          { label: "Sala 01", href: "/sala1" },
          { label: "Sala 02", href: "/sala2" },
          { label: "Sala 03", href: "/sala3" },
        ],
      },
      { label: "Instruccions", href: "/instruccions" },
      { label: "Admin", href: "/admin" },
      { label: "Sortir", onClick: handleLogout },
    ];
  }

  return (
    <nav className="w-full max-w-7xl mx-auto flex justify-between items-center p-6 z-50">
      <div className="text-xl font-bold tracking-tighter text-cyan-400">ABYSS AI</div>
      <div className="flex gap-8 text-[10px] tracking-[0.3em] text-cyan-800 uppercase font-bold relative">
        {routesToRender.map((route) =>
          route.dropdown ? (
            <div key={route.label} className="relative group">
              <span className="cursor-pointer hover:text-cyan-400">{route.label}</span>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-cyan-950 border border-cyan-700 rounded shadow-md">
                {route.dropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-cyan-50 text-[10px] hover:bg-cyan-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <span
              key={route.label}
              onClick={route.onClick}
              className={`cursor-pointer ${
                isActive(route.href) ? "text-cyan-400 border-b border-cyan-400 pb-1" : "hover:text-cyan-400"
              }`}
            >
              {route.label}
            </span>
          )
        )}
      </div>
    </nav>
  );
}
