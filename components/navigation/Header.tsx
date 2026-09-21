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
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-md">
      {/* Top row: Brand & Quick Action utilities */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-brand-600 to-amber-500 p-2 rounded-xl text-white shadow-lg shadow-brand-500/20">
            <Compass className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-400 via-amber-300 to-white bg-clip-text text-transparent flex items-center gap-1">
              BhandaraConnect
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                PWA
              </span>
            </h1>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-brand-500" />
              <span className="truncate max-w-[170px]">Connaught Place, New Delhi</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* GymRat AI shortcut */}
          <button
            onClick={() => setIsMacroModalOpen(true)}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-600 hover:to-brand-700 text-slate-950 font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-md transition active:scale-95"
            title="GymRat AI Macro Calculator"
          >
            <Dumbbell className="w-4 h-4" />
            <span className="hidden sm:inline">GymRat</span> AI
          </button>

          {/* Lost & Found button */}
          <button
            onClick={() => setIsLostFoundModalOpen(true)}
            className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
            title="Lost & Found Desk"
          >
            <PackageSearch className="w-5 h-5 text-amber-400" />
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
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Puri Sabzi, Kheer, location..."
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </header>
  );
};
