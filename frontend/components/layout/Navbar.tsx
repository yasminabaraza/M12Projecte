"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ROUTES } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="w-full max-w-7xl mx-auto flex justify-between items-center p-6 z-50">
      <div className="text-xl font-bold tracking-tighter text-cyan-400">
        ABYSS AI
      </div>
      <div className="flex gap-8 text-[10px] tracking-[0.3em] text-cyan-800 uppercase font-bold">
        {NAV_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={
              isActive(route.href)
                ? "text-cyan-400 border-b border-cyan-400 pb-1 transition-all"
                : "hover:text-cyan-400 transition-all"
            }
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
