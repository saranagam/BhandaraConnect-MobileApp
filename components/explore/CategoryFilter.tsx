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
    <div className="px-4 py-3 bg-[#FAF9F6] dark:bg-slate-950 border-b border-stone-200 dark:border-slate-800 space-y-2.5 transition-colors duration-200">
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
                  ? 'bg-amber-600 text-white border border-amber-600 font-semibold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700/80'
              }`}
            >
              📍 {r.label}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-stone-200/80 dark:bg-slate-800/80 p-1 rounded-xl border border-stone-300/60 dark:border-slate-700/60 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-stone-100 shadow-sm font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              viewMode === 'map'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-stone-100 shadow-sm font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3 text-stone-400 dark:text-stone-500" />
          Meal:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-sm'
                : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-700/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
