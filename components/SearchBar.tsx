"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";

export function SearchBar() {
  const setSearch = useAppStore((s) => s.setSearch);
  const searchValue = useAppStore((s) => s.filters.search);
  const [localValue, setLocalValue] = useState(searchValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (value: string) => {
      setLocalValue(value);
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSearch(value);
      }, 300);
    },
    [setSearch]
  );

  const handleClear = useCallback(() => {
    setLocalValue("");
    setSearch("");
    inputRef.current?.focus();
  }, [setSearch]);

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative flex items-center w-full max-w-md search-pill">
      <Search className="absolute left-4 h-4 w-4 text-brand/60 pointer-events-none" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search channels..."
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10 pr-10 h-10 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full placeholder:text-muted-foreground/60"
        aria-label="Search channels"
      />
      {localValue ? (
        <button
          onClick={handleClear}
          className="absolute right-3 p-1 rounded-full text-muted-foreground hover:text-brand hover:bg-brand/10 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <kbd className="absolute right-3 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50 bg-secondary/80 rounded border border-border/50">
          ⌘K
        </kbd>
      )}
    </div>
  );
}
