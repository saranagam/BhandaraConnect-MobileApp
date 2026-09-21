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
} from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

export const ProfileView: React.FC = () => {
  const { events, setIsOrganizeModalOpen, setSelectedEvent } = useBhandara();

  const hostedEvents = events;

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Organizer Profile Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-5 rounded-3xl shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              alt="Organizer Avatar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-white">Shree Sanatan Seva Samiti</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-brand-400 font-bold mt-0.5">Verified Organizer & Trustee</p>
              <p className="text-[11px] text-slate-400">Delhi NCR Region • Est. 2018</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Meals Served</span>
            <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
              <Utensils className="w-4 h-4" />
              24,500+
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Community Score</span>
            <div className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-emerald-400" />
              4.9 / 5.0
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-full">
            🏆 Top Organizer 2026
          </span>
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full">
            ✨ FSSAI Hygiene Certified
          </span>
        </div>

        {/* CTA: Host New Bhandara Drive */}
        <button
          onClick={() => setIsOrganizeModalOpen(true)}
          className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Host & Post a New Bhandara Drive
        </button>
      </div>

      {/* Active & Hosted Events List */}
      <div className="space-y-2.5">
        <h3 className="font-extrabold text-sm text-slate-200">Your Active & Past Drives</h3>
        <div className="space-y-2">
          {hostedEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <img src={ev.image} alt={ev.title} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{ev.location.address.split(',')[0]}</p>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                    ● Live Serving
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
