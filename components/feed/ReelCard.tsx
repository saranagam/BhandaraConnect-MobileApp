'use client';

import React, { useState } from 'react';
import { Heart, MapPin, Share2, MessageCircle, Play, Pause, ExternalLink } from 'lucide-react';
import { ReelPost } from '@/types/bhandara';
import { useBhandara } from '@/context/BhandaraContext';

interface ReelCardProps {
  reel: ReelPost;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel }) => {
  const { toggleLikeReel, events, setSelectedEvent } = useBhandara();
  const [isPlaying, setIsPlaying] = useState(true);

  const matchedEvent = events.find((e) => e.id === reel.eventId);

  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (matchedEvent) {
      setSelectedEvent(matchedEvent);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative mb-6 group">
      {/* Media Player Container */}
      <div className="relative aspect-[9/14] w-full bg-black overflow-hidden flex items-center justify-center">
        <img
          src={reel.mediaUrl}
          alt={reel.caption}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isPlaying ? 'scale-100' : 'scale-105 brightness-75'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Play/Pause Overlay Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && (
            <div className="w-14 h-14 rounded-full bg-slate-900/80 border border-slate-600 backdrop-blur-md flex items-center justify-center text-white shadow-2xl animate-in zoom-in-50 duration-200">
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </div>
          )}
        </button>

        {/* Top Header: Author & Location Tag */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-md">
            <img
              src={reel.authorAvatar}
              alt={reel.authorName}
              className="w-6 h-6 rounded-full object-cover border border-brand-500"
            />
            <span className="text-xs font-bold text-white truncate max-w-[130px]">{reel.authorName}</span>
            <span className="text-[10px] text-slate-400">• {reel.timestamp}</span>
          </div>

          {/* Location Tag Pill */}
          <button
            onClick={handleLocationClick}
            className="flex items-center gap-1 bg-brand-500/90 hover:bg-brand-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-brand-400/40 transition active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{reel.locationName}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* Right Interaction Sidebar */}
        <div className="absolute right-4 bottom-20 z-10 flex flex-col items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => toggleLikeReel(reel.id)}
            className="flex flex-col items-center group/btn"
          >
            <div
              className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                reel.isLiked
                  ? 'bg-rose-500 text-white border-rose-400 scale-110 shadow-lg shadow-rose-500/50'
                  : 'bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-6 h-6 ${reel.isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-xs font-extrabold text-white mt-1 shadow-sm">{reel.likes}</span>
          </button>

          {/* Comment Icon */}
          <button className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md hover:bg-slate-800 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white mt-1">14</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: reel.eventTitle, text: reel.caption, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Reel link copied!');
              }
            }}
            className="p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md hover:bg-slate-800 transition"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-4 inset-x-4 z-10 space-y-1">
          <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800/80 shadow-2xl">
            <h4 className="font-extrabold text-xs text-brand-400 mb-0.5">{reel.eventTitle}</h4>
            <p className="text-xs text-slate-100 font-medium leading-relaxed line-clamp-2">{reel.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
