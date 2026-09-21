'use client';

import React from 'react';
import { List, Map as MapIcon, Filter, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

export const CategoryFilter: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    selectedRadius,
    setSelectedRadius,
    selectedCategory,
    setSelectedCategory,
  } = useBhandara();

  const radiusOptions = [
    { label: 'All Radius', value: 0 },
    { label: '1 km', value: 1 },
    { label: '3 km', value: 3 },
    { label: '5 km', value: 5 },
  ];

  const categories = ['All', 'Lunch', 'Dinner', 'Breakfast', 'Prasad'];

  return (
    <div className="px-4 py-3 bg-slate-900 border-b border-slate-800/60 space-y-2.5">
      {/* View Mode Toggle & Radius Selector */}
      <div className="flex items-center justify-between gap-2">
        {/* Radius Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {radiusOptions.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedRadius(r.value)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedRadius === r.value
                  ? 'bg-slate-700 text-brand-400 border border-brand-500/40 font-semibold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/60 border border-slate-700/50'
              }`}
            >
              📍 {r.label}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'list'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'map'
                ? 'bg-brand-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3 text-slate-400" />
          Meal:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-brand-600 to-amber-500 text-white font-semibold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
