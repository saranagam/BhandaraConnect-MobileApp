'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-stone-200/90 dark:border-slate-800/90 px-2 py-1.5 shadow-xl pb-[calc(0.375rem+env(safe-area-inset-bottom))] transition-colors duration-200">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-colors duration-200 relative ${
                isActive ? 'text-amber-600 dark:text-amber-500 font-bold' : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute top-0 w-8 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-md shadow-amber-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-amber-600' : ''}`} />
              <span className="text-[11px] font-semibold tracking-tight">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
