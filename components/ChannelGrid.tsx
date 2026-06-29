"use client";

import { useState, useCallback, useMemo } from "react";
import { ChannelCard } from "./ChannelCard";
import { ChannelCardSkeleton } from "./ChannelCardSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { ChannelWithMeta } from "@/lib/types";

interface ChannelGridProps {
  channels: ChannelWithMeta[];
  isLoading?: boolean;
  title?: string;
  pageSize?: number;
  showLoadMore?: boolean;
  emptyMessage?: string;
}

export function ChannelGrid({
  channels,
  isLoading,
  title,
  pageSize = 20,
  showLoadMore = true,
  emptyMessage = "No channels found",
}: ChannelGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visibleChannels = useMemo(
    () => channels.slice(0, visibleCount),
    [channels, visibleCount]
  );

  const hasMore = visibleCount < channels.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + pageSize);
  }, [pageSize]);

  if (isLoading) {
    return (
      <section className="glass-panel rounded-2xl p-4 sm:p-5">
        {title && (
          <h2 className="section-header text-lg font-display font-bold text-foreground mb-5">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-2.5 auto-rows-fr">
          {Array.from({ length: 12 }).map((_, i) => (
            <ChannelCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (channels.length === 0) {
    return (
      <section className="glass-panel rounded-2xl p-12 text-center">
        <p className="text-muted-foreground text-lg font-display">{emptyMessage}</p>
        {emptyMessage === "No channels found" && (
          <p className="text-muted-foreground/70 text-sm mt-2">
            Try adjusting your search or filters
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-2xl p-4 sm:p-5">
      {title && (
        <div className="flex items-center justify-between mb-5 gap-4">
          <h2 className="section-header text-lg font-display font-bold text-foreground">
            {title}
          </h2>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 shrink-0">
            {channels.length.toLocaleString()} channels
          </span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-2.5 auto-rows-fr">
        {visibleChannels.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} index={i} />
        ))}
      </div>
      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-8 pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            className="gap-2 rounded-full px-8 border-brand/30 hover:border-brand/60 hover:bg-brand/5"
          >
            <ChevronDown className="h-4 w-4" />
            Load More ({channels.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </section>
  );
}
