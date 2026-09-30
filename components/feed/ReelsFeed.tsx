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
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-md border border-amber-400/30">
        <div>
          <h2 className="font-extrabold text-base text-white flex items-center gap-1.5">
            <Film className="w-5 h-5 text-yellow-200" />
            Local Bhandara Reels
          </h2>
          <p className="text-xs text-amber-100 mt-0.5">Live ground updates from volunteers & sevadars</p>
        </div>
        <button
          onClick={() => setIsPostReelModalOpen(true)}
          className="flex items-center gap-1.5 bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-sm shrink-0 transition active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-amber-600" />
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
