'use client';

import React, { useState } from 'react';
import { Trophy, Award, HeartHandshake, ShieldCheck, Users, Sparkles, Star, Flame } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, setIsVolunteerModalOpen } = useBhandara();
  const [activeTab, setActiveTab] = useState<'volunteer' | 'donor'>('volunteer');

  const filteredUsers = leaderboard.filter((u) => u.type === activeTab);

  const getTierBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Annadata Master':
        return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/40';
      case 'Community Hero':
        return 'bg-gradient-to-r from-brand-500/20 to-amber-500/20 text-brand-300 border-brand-500/40';
      case 'Seva Warrior':
        return 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-700/60 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Leaderboard Banner Header */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 p-5 rounded-3xl shadow-md relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
          <Trophy className="w-32 h-32 text-yellow-200" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20 text-yellow-100 border border-white/30 backdrop-blur-md">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="font-extrabold text-lg text-white">Community Seva Leaderboard</h2>
          </div>
          <p className="text-xs text-amber-100 max-w-[280px]">
            Recognizing selfless donors & active volunteers distributing food across the city.
          </p>

          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="mt-2 inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95"
          >
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            Apply to Volunteer Today
          </button>
        </div>
      </div>

      {/* Leaderboard Tabs: Active Volunteers vs Top Donors */}
      <div className="flex items-center bg-stone-200/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-stone-300/60 dark:border-slate-700/60">
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'volunteer'
              ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <Users className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          Active Volunteers
        </button>
        <button
          onClick={() => setActiveTab('donor')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'donor'
              ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          Top Donors
        </button>
      </div>

      {/* Ranks List */}
      <div className="space-y-2.5">
        {filteredUsers.map((user, idx) => {
          const rankNumber = idx + 1;
          const isTop3 = rankNumber <= 3;

          return (
            <div
              key={user.id}
              className={`bg-white dark:bg-slate-900 border p-3.5 rounded-2xl flex items-center justify-between transition-all hover:bg-stone-50 dark:hover:bg-slate-800/80 shadow-sm ${
                isTop3
                  ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20 shadow-amber-500/5'
                  : 'border-stone-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                    rankNumber === 1
                      ? 'bg-amber-500 text-white shadow-sm'
                      : rankNumber === 2
                      ? 'bg-stone-300 dark:bg-slate-700 text-stone-900 dark:text-stone-100'
                      : rankNumber === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-200 dark:bg-slate-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  #{rankNumber}
                </div>

                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-200 dark:border-slate-700 shrink-0"
                />

                {/* Info */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">{user.name}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getTierBadgeStyle(
                        user.tierBadge
                      )}`}
                    >
                      {user.tierBadge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats: Meals & Points */}
              <div className="text-right shrink-0">
                <div className="font-extrabold text-xs text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{user.points} pts</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                  {user.mealsServed.toLocaleString()} Meals
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
