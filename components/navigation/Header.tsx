'use client';

import React from 'react';
import { Compass, Search, Dumbbell, MapPin, PackageSearch, Sparkles, Sun, Moon, Smartphone } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useBhandara } from '@/context/BhandaraContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setIsMacroModalOpen,
    setIsLostFoundModalOpen,
    lostFoundItems,
    activeTab,
    themeMode,
    setThemeMode,
    resolvedTheme,
  } = useBhandara();

  const reportedLostCount = lostFoundItems.filter((i) => i.status === 'Reported').length;

  const cycleTheme = () => {
    if (themeMode === 'system') setThemeMode('light');
    else if (themeMode === 'light') setThemeMode('dark');
    else setThemeMode('system');
  };

  const renderThemeIcon = () => {
    if (themeMode === 'system') return <Smartphone className="w-4 h-4 text-amber-500" />;
    if (themeMode === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    return <Moon className="w-4 h-4 text-amber-400" />;
  };

  const getThemeLabel = () => {
    if (themeMode === 'system') return `System (${resolvedTheme})`;
    if (themeMode === 'light') return 'Light';
    return 'Dark';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800/80 px-4 py-3 shadow-sm pt-[calc(0.75rem+env(safe-area-inset-top))] transition-colors duration-200">
      {/* Top row: Brand & Quick Action utilities */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-600 p-2 rounded-xl text-white shadow-md shadow-amber-500/20">
            <Compass className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-400 dark:via-amber-300 dark:to-yellow-400 bg-clip-text text-transparent flex items-center gap-1">
              BhandaraConnect
            </h1>
            <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-500" />
              <span className="truncate max-w-[170px]">Connaught Place, New Delhi</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="text-xs font-bold text-stone-700 dark:text-stone-200 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="text-xs font-bold text-white px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600"
              >
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/login/" />
          </SignedIn>

          {/* Mobile Theme Switcher Toggle */}
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1 p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-700 transition active:scale-95"
            title={`App Theme: ${getThemeLabel()} (Click to toggle)`}
          >
            {renderThemeIcon()}
          </button>

          {/* GymRat AI shortcut */}
          <button
            onClick={() => setIsMacroModalOpen(true)}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-sm transition active:scale-95"
            title="GymRat AI Macro Calculator"
          >
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">GymRat</span> AI
          </button>

          {/* Lost & Found button */}
          <button
            onClick={() => setIsLostFoundModalOpen(true)}
            className="relative p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-700 transition active:scale-95"
            title="Lost & Found Desk"
          >
            <PackageSearch className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            {reportedLostCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {reportedLostCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input (only show in explore tab) */}
      {activeTab === 'explore' && (
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Puri Sabzi, Kheer, location..."
            className="w-full bg-stone-100/90 dark:bg-slate-800/90 border border-stone-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-amber-500 dark:focus:border-amber-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 text-xs hover:text-stone-700 dark:hover:text-stone-300"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </header>
  );
};
