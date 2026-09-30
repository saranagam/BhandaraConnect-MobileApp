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
      <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              alt="Organizer Avatar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-stone-900">Shree Sanatan Seva Samiti</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-amber-600 font-bold mt-0.5">Verified Organizer & Trustee</p>
              <p className="text-[11px] text-stone-500">Delhi NCR Region • Est. 2018</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-100">
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Total Meals Served</span>
            <div className="text-lg font-black text-amber-600 flex items-center justify-center gap-1 mt-0.5">
              <Utensils className="w-4 h-4" />
              24,500+
            </div>
          </div>
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Community Score</span>
            <div className="text-lg font-black text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              4.9 / 5.0
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
            🏆 Top Organizer 2026
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
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

      {/* Active & Hosted Events List */}
      <div className="space-y-2.5">
        <h3 className="font-extrabold text-sm text-stone-900">Your Active & Past Drives</h3>
        <div className="space-y-2">
          {hostedEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="bg-white hover:bg-stone-50 border border-stone-200 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={ev.image} alt={ev.title} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{ev.title}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{ev.location.address.split(',')[0]}</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-1 inline-block">
                    ● Live Serving
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
