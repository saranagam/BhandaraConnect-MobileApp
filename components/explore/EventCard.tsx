'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Package,
  ChevronRight,
  Sparkles,
  Dumbbell,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { BhandaraEvent, CrowdLevel } from '@/types/bhandara';
import { useBhandara } from '@/context/BhandaraContext';

interface EventCardProps {
  event: BhandaraEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setSelectedEvent, setIsMacroModalOpen, setMacroPreselectedFood } = useBhandara();

  const getCrowdBadge = (level: CrowdLevel) => {
    switch (level) {
      case 'Low':
        return (
          <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Low Crowd
          </span>
        );
      case 'Moderate':
        return (
          <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Moderate Crowd
          </span>
        );
      case 'Packed':
        return (
          <span className="flex items-center gap-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            Packed Queue
          </span>
        );
    }
  };

  const totalVotes = event.votes.yes + event.votes.no;
  const activePercentage = totalVotes > 0 ? Math.round((event.votes.yes / totalVotes) * 100) : 100;

  return (
    <div
      onClick={() => setSelectedEvent(event)}
      className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4 shadow-xl hover:shadow-brand-500/10 transition-all duration-200 cursor-pointer relative overflow-hidden group mb-3.5"
    >
      {/* Top Banner Image & Status Overlay */}
      <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

        {/* Live Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-600/90 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Live Bhandara
        </div>

        {/* Crowd Badge */}
        <div className="absolute top-2.5 right-2.5">{getCrowdBadge(event.crowdLevel)}</div>

        {/* Distance Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700/60">
          <MapPin className="w-3.5 h-3.5 text-brand-400" />
          <span>{event.location.distanceKm} km away</span>
        </div>

        {/* Active Vote Confidence */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{activePercentage}% Food Active</span>
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-2">
        {/* Title & Organizer */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-slate-100 group-hover:text-brand-400 transition-colors line-clamp-1">
              {event.title}
            </h3>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-300">
            <span className="font-medium text-slate-300">{event.organizer.name}</span>
            {event.organizer.isVerified && (
              <span className="flex items-center gap-0.5 text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Menu Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {event.menu.map((item) => (
            <span
              key={item.id}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                item.isPopular
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600/50'
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Meta details bar: Hygiene, Packing, Timing */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {/* Hygiene score */}
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{event.hygieneRating}</span>
            </div>

            {/* Packing badge */}
            <div className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span className={event.packingAvailable ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                Packing: {event.packingAvailable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Time text */}
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-medium">{event.timing.endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
