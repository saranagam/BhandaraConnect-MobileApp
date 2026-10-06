'use client';

import React from 'react';
import {
  ShieldCheck,
  PlusCircle,
  Award,
  Utensils,
  MapPin,
  Clock,
  ChevronRight,
  Phone,
  Sparkles,
  Flame,
  Sun,
  Moon,
  Smartphone,
  Palette,
  LogOut,
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useBhandara } from '@/context/BhandaraContext';

export const ProfileView: React.FC = () => {
  const { events, setIsOrganizeModalOpen, setSelectedEvent, themeMode, setThemeMode, resolvedTheme } = useBhandara();
  const { user } = useUser();
  const { signOut } = useClerk();

  const hostedEvents = events;
  const displayName =
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress ||
    'Shree Sanatan Seva Samiti';
  const avatarUrl =
    user?.imageUrl ||
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80';

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Signed-in account */}
      {user && (
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-xl object-cover border border-amber-400/60 shrink-0"
            />
            <div className="min-w-0">
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{displayName}</p>
              <p className="text-[11px] text-stone-500 truncate">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: '/login/' })}
            className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-slate-800 px-3 py-2 rounded-xl hover:bg-stone-200 dark:hover:bg-slate-700 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      )}

      {/* Organizer Profile Card */}
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm space-y-4 relative overflow-hidden transition-colors duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="Organizer Avatar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">{displayName}</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-500 font-bold mt-0.5">Verified Organizer & Trustee</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Delhi NCR Region • Est. 2018</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-100 dark:border-slate-800">
          <div className="bg-stone-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-stone-200 dark:border-slate-700/60 text-center">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">Total Meals Served</span>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-0.5">
              <Utensils className="w-4 h-4" />
              24,500+
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-stone-200 dark:border-slate-700/60 text-center">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-bold tracking-wider">Community Score</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
              4.9 / 5.0
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 px-2.5 py-1 rounded-full">
            🏆 Top Organizer 2026
          </span>
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-full">
            ✨ FSSAI Hygiene Certified
          </span>
        </div>

        {/* CTA: Host New Bhandara Drive */}
        <button
          onClick={() => setIsOrganizeModalOpen(true)}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Host & Post a New Bhandara Drive
        </button>
      </div>

      {/* Theme & Mobile Appearance Settings Card */}
      <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm space-y-3 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">App Theme & Appearance</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Match phone settings or pick custom theme</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 capitalize">
            {themeMode === 'system' ? `Mobile (${resolvedTheme})` : themeMode}
          </span>
        </div>

        {/* Theme Options Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* System Option */}
          <button
            onClick={() => setThemeMode('system')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
              themeMode === 'system'
                ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/30'
                : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-5 h-5 mb-1 text-amber-500" />
            <span>System</span>
            <span className="text-[9px] font-normal text-stone-400 dark:text-stone-500 mt-0.5">Mobile Theme</span>
          </button>

          {/* Light Option */}
          <button
            onClick={() => setThemeMode('light')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
              themeMode === 'light'
                ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/30'
                : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sun className="w-5 h-5 mb-1 text-amber-500" />
            <span>Light</span>
            <span className="text-[9px] font-normal text-stone-400 dark:text-stone-500 mt-0.5">Always Day</span>
          </button>

          {/* Dark Option */}
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
              themeMode === 'dark'
                ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/30'
                : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            <Moon className="w-5 h-5 mb-1 text-amber-400" />
            <span>Dark</span>
            <span className="text-[9px] font-normal text-stone-400 dark:text-stone-500 mt-0.5">Always Night</span>
          </button>
        </div>
      </div>

      {/* Active & Hosted Events List */}
      <div className="space-y-2.5">
        <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">Your Active & Past Drives</h3>
        <div className="space-y-2">
          {hostedEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800/80 border border-stone-200 dark:border-slate-800 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={ev.image} alt={ev.title} className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-slate-700" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">{ev.title}</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{ev.location.address.split(',')[0]}</p>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded mt-1 inline-block">
                    ● Live Serving
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 dark:text-stone-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
