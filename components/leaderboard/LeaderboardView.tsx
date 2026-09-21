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
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 border border-slate-700/80 p-5 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Trophy className="w-32 h-32 text-amber-400" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="font-extrabold text-lg text-white">Community Seva Leaderboard</h2>
          </div>
          <p className="text-xs text-slate-300 max-w-[280px]">
            Recognizing selfless donors & active volunteers distributing food across the city.
          </p>

          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg transition active:scale-95"
          >
            <HeartHandshake className="w-4 h-4" />
            Apply to Volunteer Today
          </button>
        </div>
      </div>

      {/* Leaderboard Tabs: Active Volunteers vs Top Donors */}
      <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'volunteer'
              ? 'bg-gradient-to-r from-brand-600 to-amber-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Active Volunteers
        </button>
        <button
          onClick={() => setActiveTab('donor')}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'donor'
              ? 'bg-gradient-to-r from-brand-600 to-amber-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
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
              className={`bg-slate-800/80 border p-3.5 rounded-2xl flex items-center justify-between transition-all hover:bg-slate-800 ${
                isTop3 ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-slate-700/60'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                    rankNumber === 1
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/50'
                      : rankNumber === 2
                      ? 'bg-slate-300 text-slate-950'
                      : rankNumber === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  #{rankNumber}
                </div>

                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shrink-0"
                />

                {/* Info */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-white">{user.name}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
                <div className="font-extrabold text-xs text-brand-400 flex items-center justify-end gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{user.points} pts</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
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
