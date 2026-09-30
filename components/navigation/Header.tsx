'use client';

import React from 'react';
import { Compass, Search, Dumbbell, MapPin, PackageSearch, Sparkles } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setIsMacroModalOpen,
    setIsLostFoundModalOpen,
    lostFoundItems,
    activeTab,
  } = useBhandara();

  const reportedLostCount = lostFoundItems.filter((i) => i.status === 'Reported').length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 shadow-sm pt-[calc(0.75rem+env(safe-area-inset-top))]">
      {/* Top row: Brand & Quick Action utilities */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-600 p-2 rounded-xl text-white shadow-md shadow-amber-500/20">
            <Compass className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent flex items-center gap-1">
              BhandaraConnect
            </h1>
            <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
              <MapPin className="w-3 h-3 text-amber-600" />
              <span className="truncate max-w-[170px]">Connaught Place, New Delhi</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
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
            className="relative p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition active:scale-95"
            title="Lost & Found Desk"
          >
            <PackageSearch className="w-5 h-5 text-amber-600" />
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
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Puri Sabzi, Kheer, location..."
            className="w-full bg-stone-100/90 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-amber-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs hover:text-stone-700"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </header>
  );
};
