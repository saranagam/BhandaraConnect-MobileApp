'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Compass, Info, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BhandaraEvent } from '@/types/bhandara';
import { useBhandara } from '@/context/BhandaraContext';

interface DynamicMapProps {
  events: BhandaraEvent[];
}

export const DynamicMap: React.FC<DynamicMapProps> = ({ events }) => {
  const { setSelectedEvent, selectedRadius } = useBhandara();
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic import for Leaflet CSS & JS on client
    import('leaflet').then((L) => {
      // Fix marker icon issue in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setIsLeafletLoaded(true);
    });
  }, []);

  const activePinEvent = events.find((e) => e.id === activePinId) || events[0];

  return (
    <div className="w-full h-[70vh] relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
      {/* Top Radius Header */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 text-xs font-semibold text-slate-200 pointer-events-auto flex items-center gap-1.5 shadow-lg">
          <Compass className="w-4 h-4 text-brand-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Showing {events.length} Live Bhandaras</span>
          {selectedRadius > 0 && (
            <span className="text-[10px] bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full font-bold">
              Within {selectedRadius}km
            </span>
          )}
        </div>
      </div>

      {/* Interactive Pin Grid Container (Interactive Canvas / Map View) */}
      <div className="relative w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* User Centered Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-brand-500/10 border border-brand-500/30 animate-ping absolute" />
          <div className="w-6 h-6 rounded-full bg-brand-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold z-10">
            You
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded-full mt-1 border border-slate-800 shadow">
            Your Location (CP, Delhi)
          </span>
        </div>

        {/* Dynamic Plot Pins around user */}
        {events.map((event, idx) => {
          // Calculate relative offsets for visual map display
          const offsets = [
            { top: '25%', left: '30%' },
            { top: '65%', left: '70%' },
            { top: '20%', left: '75%' },
            { top: '75%', left: '25%' },
          ];
          const pos = offsets[idx % offsets.length];
          const isSelected = activePinId === event.id;

          return (
            <div
              key={event.id}
              style={{ top: pos.top, left: pos.left }}
              onClick={() => setActivePinId(event.id)}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div
                className={`flex flex-col items-center transition-transform duration-200 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                {/* Pin Badge Callout */}
                <div
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold whitespace-nowrap shadow-xl border flex items-center gap-1 ${
                    isSelected
                      ? 'bg-brand-500 text-white border-white'
                      : 'bg-slate-900 text-slate-200 border-slate-700 group-hover:border-brand-500'
                  }`}
                >
                  <span>{event.title.split(' ')[0]}</span>
                  <span className="text-[9px] opacity-80">({event.location.distanceKm}km)</span>
                </div>

                {/* Marker Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-tr from-brand-600 to-amber-400 border-white text-white shadow-brand-500/50 ring-4 ring-brand-500/30'
                      : 'bg-slate-800 border-brand-500 text-brand-400'
                  }`}
                >
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pin Bottom Preview Card */}
      {activePinEvent && (
        <div className="absolute bottom-3 inset-x-3 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3">
            <img
              src={activePinEvent.image}
              alt={activePinEvent.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate">{activePinEvent.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{activePinEvent.location.address}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                  {activePinEvent.location.distanceKm} km away
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {activePinEvent.crowdLevel} Crowd
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedEvent(activePinEvent)}
              className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shrink-0 transition"
            >
              Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
