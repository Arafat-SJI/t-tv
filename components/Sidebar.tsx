"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Globe,
  LayoutGrid,
  Languages as LanguagesIcon,
  Heart,
  X,
  ChevronRight,
  ChevronDown,
  Tv,
  Trophy,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import type { Country, Category, Language } from "@/lib/types";

interface SidebarProps {
  countries: Country[];
  categories: Category[];
  languages: Language[];
  fifaChannelCount?: number;
}

export function Sidebar({ countries, categories, languages, fifaChannelCount = 0 }: SidebarProps) {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeView,
    setActiveView,
    filters,
    setCountryFilter,
    setCategoryFilter,
    setLanguageFilter,
    favorites,
    clearFilters,
  } = useAppStore();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleNavClick = (view: typeof activeView) => {
    setActiveView(view);
    clearFilters();
    setSidebarOpen(false);
  };

  const handleCountryClick = (code: string) => {
    setActiveView("countries");
    setCountryFilter([code]);
    setSidebarOpen(false);
  };

  const handleCategoryClick = (id: string) => {
    setActiveView("categories");
    setCategoryFilter([id]);
    setSidebarOpen(false);
  };

  const handleLanguageClick = (code: string) => {
    setActiveView("languages");
    setLanguageFilter([code]);
    setSidebarOpen(false);
  };

  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    {
      id: "fifa" as const,
      label: "FIFA World Cup",
      icon: Trophy,
      count: fifaChannelCount,
      live: true,
    },
    { id: "countries" as const, label: "Countries", icon: Globe },
    { id: "categories" as const, label: "Categories", icon: LayoutGrid },
    { id: "languages" as const, label: "Languages", icon: LanguagesIcon },
    { id: "favorites" as const, label: "Favorites", icon: Heart, count: favorites.length },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 glass-sidebar transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-brand/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand/20 to-brand-accent/10 flex items-center justify-center brand-glow border border-brand/20">
                <Tv className="h-5 w-5 text-brand animate-neo-flicker" />
              </div>
              <div>
                <span className="font-display font-bold text-lg leading-tight block">
                  Tower<span className="text-brand brand-text-glow">TV</span>
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Live TV
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-1">
              <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Menu
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeView === item.id
                      ? item.id === "fifa"
                        ? "nav-active-indicator bg-brand/15 text-brand shadow-brand-sm border border-brand/20"
                        : "nav-active-indicator bg-brand/10 text-brand shadow-brand-sm"
                      : item.id === "fifa"
                        ? "text-brand/90 hover:bg-brand/10 hover:text-brand border border-brand/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <item.icon className={`h-4 w-4 shrink-0 ${item.id === "fifa" ? "text-brand" : ""}`} />
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  <span className="ml-auto flex items-center gap-1.5 shrink-0">
                    {"live" in item && item.live && activeView !== item.id && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-red-500">
                        <Radio className="h-2.5 w-2.5 animate-pulse" />
                        LIVE
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <Badge variant="brand" className="text-[10px] px-1.5 py-0">
                        {item.count}
                      </Badge>
                    )}
                  </span>
                </button>
              ))}

              <Separator className="my-4 bg-brand/10" />

              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Browse
              </p>
              <button
                onClick={() => toggleSection("countries")}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Browse Countries
                </span>
                {expandedSection === "countries" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "countries" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto space-y-0.5 pl-4">
                      {sortedCountries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => handleCountryClick(country.code)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                            filters.countries.includes(country.code)
                              ? "bg-brand/10 text-brand"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          <span>{country.flag}</span>
                          <span className="truncate">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Categories section */}
              <button
                onClick={() => toggleSection("categories")}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Browse Categories
                </span>
                {expandedSection === "categories" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "categories" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto space-y-0.5 pl-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                            filters.categories.includes(cat.id)
                              ? "bg-brand/10 text-brand"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Languages section */}
              <button
                onClick={() => toggleSection("languages")}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LanguagesIcon className="h-4 w-4" />
                  Browse Languages
                </span>
                {expandedSection === "languages" ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              <AnimatePresence>
                {expandedSection === "languages" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto space-y-0.5 pl-4">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageClick(lang.code)}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                            filters.languages.includes(lang.code)
                              ? "bg-brand/10 text-brand"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          <span className="truncate">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-brand/10">
            <p className="text-[10px] text-muted-foreground/80 text-center">
              Powered by iptv-org
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
