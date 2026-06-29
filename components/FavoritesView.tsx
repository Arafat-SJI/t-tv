"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";
import { ChannelGrid } from "./ChannelGrid";
import { useAppStore } from "@/lib/store";
import type { ChannelWithMeta } from "@/lib/types";

interface FavoritesViewProps {
  allChannels: ChannelWithMeta[];
}

export function FavoritesView({ allChannels }: FavoritesViewProps) {
  const favorites = useAppStore((s) => s.favorites);

  const favoriteChannels = useMemo(
    () => allChannels.filter((ch) => favorites.includes(ch.id)),
    [allChannels, favorites]
  );

  if (favoriteChannels.length === 0) {
    return (
      <section className="glass-panel rounded-2xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center brand-glow">
          <Heart className="h-8 w-8 text-brand/40" />
        </div>
        <h2 className="font-display text-xl font-bold mb-2">No Favorites Yet</h2>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
          Tap the heart on any channel to save it here for quick access.
        </p>
      </section>
    );
  }

  return (
    <ChannelGrid
      channels={favoriteChannels}
      title="My Favorites"
      showLoadMore={false}
    />
  );
}
