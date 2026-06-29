import { Skeleton } from "@/components/ui/skeleton";

export function ChannelCardSkeleton() {
  return (
    <div className="flex h-full min-h-[148px] flex-col rounded-lg border border-brand/10 bg-card/60 overflow-hidden">
      <Skeleton className="h-[72px] w-full shrink-0 rounded-none bg-brand/5" />
      <div className="flex flex-1 flex-col p-2 space-y-1.5 border-t border-brand/5 min-h-[76px]">
        <Skeleton className="h-3 w-4/5 bg-brand/10" />
        <Skeleton className="h-2.5 w-1/2 bg-brand/5" />
        <div className="mt-auto flex gap-1 pt-1">
          <Skeleton className="h-3.5 w-10 rounded-full bg-brand/10" />
          <Skeleton className="h-3.5 w-8 rounded-full bg-brand/10" />
        </div>
      </div>
    </div>
  );
}
