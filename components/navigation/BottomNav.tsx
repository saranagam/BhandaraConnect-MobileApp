'use client';

import React from 'react';
import { Compass, PlaySquare, Trophy, User } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useBhandara();

  const navItems = [
    { id: 'explore' as const, label: 'Explore', icon: Compass },
    { id: 'feed' as const, label: 'Feed', icon: PlaySquare },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as const, label: 'Organize', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-brand-500 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-brand-500 rounded-full shadow-lg shadow-brand-500/50 animate-pulse" />
              )}
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-brand-500' : ''}`} />
              <span className="text-[11px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
