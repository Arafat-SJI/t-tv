"use client";

import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Heart, Users, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ChannelWithMeta } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { getPlaceholderLogo, formatViewerCount } from "@/lib/utils";

interface ChannelCardProps {
  channel: ChannelWithMeta;
  index?: number;
}

export const ChannelCard = memo(function ChannelCard({
  channel,
  index = 0,
}: ChannelCardProps) {
  const openPlayer = useAppStore((s) => s.openPlayer);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favorites = useAppStore((s) => s.favorites);
  const isFav = favorites.includes(channel.id);
  const [imgError, setImgError] = useState(false);

  const handlePlay = useCallback(() => {
    openPlayer(channel);
  }, [openPlayer, channel]);

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(channel.id);
    },
    [toggleFavorite, channel.id]
  );

  const logoSrc =
    !imgError && channel.logo ? channel.logo : getPlaceholderLogo(channel.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
      className="group relative h-full"
    >
      <div
        onClick={handlePlay}
        className="card-shine relative flex h-full min-h-[148px] flex-col overflow-hidden rounded-lg border border-brand/10 bg-card/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-brand/20 hover:-translate-y-0.5"
        role="button"
        tabIndex={0}
        aria-label={`Play ${channel.name}`}
        onKeyDown={(e) => e.key === "Enter" && handlePlay()}
      >
        <div className="relative h-[72px] shrink-0 bg-gradient-to-br from-brand/5 via-secondary/50 to-background flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt={channel.name}
            className="h-full w-full object-contain p-2"
            loading="lazy"
            onError={() => setImgError(true)}
          />

          {channel.isLive && (
            <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-red-600/90 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-px rounded-full">
              <Radio className="h-2 w-2 animate-pulse" />
              LIVE
            </div>
          )}

          <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-px rounded-full">
            <Users className="h-2.5 w-2.5" />
            {formatViewerCount(channel.viewerCount)}
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shadow-brand-sm">
                <Play className="h-4 w-4 text-black ml-0.5" fill="black" />
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-1 right-1 h-6 w-6 bg-black/50 backdrop-blur-sm hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all"
            onClick={handleFavorite}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-3 w-3 transition-colors ${
                isFav ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </Button>
        </div>

        <div className="flex flex-1 flex-col p-2 border-t border-brand/5 bg-card/50 min-h-[76px]">
          <h3 className="font-semibold text-xs leading-tight line-clamp-2 min-h-[2rem] group-hover:text-brand transition-colors">
            {channel.name}
          </h3>

          <p className="mt-1 text-[10px] text-muted-foreground truncate min-h-[14px]">
            {channel.countryInfo
              ? `${channel.countryInfo.flag} ${channel.countryInfo.name}`
              : "\u00A0"}
          </p>

          <div className="mt-auto flex flex-wrap gap-0.5 min-h-[18px] pt-1 overflow-hidden">
            {channel.categories?.slice(0, 2).map((cat) => (
              <Badge
                key={cat}
                variant="brand"
                className="text-[8px] px-1 py-0 leading-tight max-w-full truncate"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
