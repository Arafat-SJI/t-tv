"use client";

import {
  Home,
  LayoutGrid,
  Heart,
  Shuffle,
  Trophy,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function MobileNav() {
  const { activeView, setActiveView, clearFilters, favorites, allChannels, openPlayer } =
    useAppStore();

  const handleNav = (view: typeof activeView) => {
    setActiveView(view);
    clearFilters();
  };

  const handleRandom = () => {
    if (allChannels.length === 0) return;
    const live = allChannels.filter((ch) => ch.isLive);
    const pool = live.length > 0 ? live : allChannels;
    openPlayer(pool[Math.floor(Math.random() * pool.length)]);
  };

  const items = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "fifa" as const, label: "FIFA", icon: Trophy },
    { id: "random" as const, label: "Random", icon: Shuffle, highlight: true },
    { id: "categories" as const, label: "Categories", icon: LayoutGrid },
    { id: "favorites" as const, label: "Favorites", icon: Heart, count: favorites.length },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden pointer-events-none">
      <div className="mobile-dock rounded-2xl pointer-events-auto mx-auto max-w-md">
        <div className="flex items-center justify-around h-14 px-1">
          {items.map((item) => {
            const isActive = activeView === item.id;
            const isRandom = item.id === "random";

            return (
              <button
                key={item.id}
                onClick={() =>
                  item.id === "random" ? handleRandom() : handleNav(item.id)
                }
                className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-all duration-200 ${
                  isRandom
                    ? "text-black"
                    : isActive
                      ? "text-brand"
                      : "text-muted-foreground"
                }`}
                aria-label={item.label}
              >
                {isRandom ? (
                  <div className="w-10 h-10 -mt-5 rounded-full bg-brand flex items-center justify-center shadow-brand-lg border-2 border-background">
                    <item.icon className="h-4 w-4" />
                  </div>
                ) : (
                  <>
                    <item.icon className={`h-5 w-5 ${isActive ? "brand-text-glow" : ""}`} />
                    <span className="text-[9px] font-medium">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="absolute top-0 right-2 w-4 h-4 bg-brand text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
