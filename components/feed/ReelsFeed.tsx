'use client';

import React from 'react';
import { PlusCircle, Sparkles, Film } from 'lucide-react';
import { ReelCard } from './ReelCard';
import { useBhandara } from '@/context/BhandaraContext';

export const ReelsFeed: React.FC = () => {
  const { reels, setIsPostReelModalOpen } = useBhandara();

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Top Banner & Post Reel Floating CTA */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between shadow-xl">
        <div>
          <h2 className="font-extrabold text-base text-white flex items-center gap-1.5">
            <Film className="w-5 h-5 text-brand-500" />
            Local Bhandara Reels
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Live ground updates from volunteers & sevadars</p>
        </div>
        <button
          onClick={() => setIsPostReelModalOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-lg shrink-0 transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          Post Update
        </button>
      </div>

      {/* Reels List */}
      <div className="space-y-4">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
};
