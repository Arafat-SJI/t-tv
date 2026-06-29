"use client";

import { useRouter } from "next/navigation";
import { Shuffle, Menu, Tv, Radio, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const router = useRouter();
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const allChannels = useAppStore((s) => s.allChannels);
  const openPlayer = useAppStore((s) => s.openPlayer);
  const currentChannel = useAppStore((s) => s.currentChannel);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const handleRandomChannel = () => {
    if (allChannels.length === 0) return;
    const liveChannels = allChannels.filter((ch) => ch.isLive);
    const pool = liveChannels.length > 0 ? liveChannels : allChannels;
    const random = pool[Math.floor(Math.random() * pool.length)];
    openPlayer(random);
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-nav">
      <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 lg:hidden min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center brand-glow shrink-0">
              <Tv className="h-4 w-4 text-brand" />
            </div>
            <span className="font-display font-bold truncate">
              Tower<span className="text-brand">TV</span>
            </span>
          </div>
          {currentChannel && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 max-w-[200px] lg:max-w-xs">
              <Radio className="h-3 w-3 text-red-500 animate-pulse shrink-0" />
              <span className="text-xs font-medium truncate text-brand">
                {currentChannel.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="brand"
            size="sm"
            onClick={handleRandomChannel}
            className="gap-1.5 hidden sm:flex rounded-full"
          >
            <Shuffle className="h-4 w-4" />
            Random
          </Button>
          <Button
            variant="brand"
            size="icon"
            onClick={handleRandomChannel}
            className="sm:hidden rounded-full"
            aria-label="Random channel"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Sign out"
            className="rounded-full"
          >
            <LogOut className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="gradient-line" />
    </header>
  );
}
