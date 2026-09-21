'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Star,
  Package,
  Dumbbell,
  Users,
  PackageSearch,
  Share2,
  Phone,
  Calendar,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { BhandaraEvent } from '@/types/bhandara';
import { useBhandara } from '@/context/BhandaraContext';

interface EventDrawerProps {
  event: BhandaraEvent;
  onClose: () => void;
}

export const EventDrawer: React.FC<EventDrawerProps> = ({ event, onClose }) => {
  const {
    handleVote,
    setIsMacroModalOpen,
    setMacroPreselectedFood,
    setVolunteerEventTarget,
    setIsVolunteerModalOpen,
    lostFoundItems,
    resolveLostFoundItem,
    addLostFoundItem,
  } = useBhandara();

  const [activeSubTab, setActiveSubTab] = useState<'menu' | 'lostfound'>('menu');
  const [newLostTitle, setNewLostTitle] = useState('');
  const [newLostDesc, setNewLostDesc] = useState('');
  const [newLostContact, setNewLostContact] = useState('');
  const [isAddingLostItem, setIsAddingLostItem] = useState(false);

  const totalVotes = event.votes.yes + event.votes.no;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${event.location.lat},${event.location.lng}`;

  const eventLostItems = lostFoundItems.filter((i) => i.eventId === event.id);

  const handleCreateLostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLostTitle.trim()) return;
    addLostFoundItem({
      eventId: event.id,
      eventTitle: event.title,
      title: newLostTitle,
      description: newLostDesc || 'Item lost near bhandara venue.',
      category: 'Wallet',
      contactName: 'User Report',
      contactPhone: newLostContact || '+91 98000 00000',
    });
    setNewLostTitle('');
    setNewLostDesc('');
    setNewLostContact('');
    setIsAddingLostItem(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Free Mahaprasad Bhandara live at ${event.location.address}! Check menu and status on BhandaraConnect.`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end flex-col max-w-md mx-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border-t border-slate-700 rounded-t-3xl max-h-[90vh] overflow-y-auto flex flex-col w-full shadow-2xl no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Image */}
        <div className="relative h-48 w-full shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 hover:text-white border border-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 hover:text-white border border-slate-700 transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Distance badge */}
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-brand-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
            <MapPin className="w-3.5 h-3.5" />
            {event.location.distanceKm} km away
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 text-slate-100 flex-1">
          {/* Event Title & Organizer */}
          <div>
            <h2 className="text-xl font-extrabold text-white leading-tight">{event.title}</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
              <span className="font-semibold text-brand-400">{event.organizer.name}</span>
              {event.organizer.isVerified && (
                <span className="flex items-center gap-0.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  <ShieldCheck className="w-3 h-3" /> Verified Organizer
                </span>
              )}
            </div>
          </div>

          {/* Location & Deep Link Direction Button */}
          <div className="bg-slate-800/80 border border-slate-700/70 p-3 rounded-xl flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-slate-300 flex items-start gap-1">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{event.location.address}</span>
              </p>
              {event.location.landmark && (
                <p className="text-[11px] text-slate-400 pl-5">Near: {event.location.landmark}</p>
              )}
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow-lg shrink-0 active:scale-95 transition"
            >
              <Navigation className="w-4 h-4" />
              Directions
            </a>
          </div>

          {/* Active Status Voting & Serving Timer Widget */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/60 border border-slate-700/80 p-3.5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">
                  {event.timing.remainingTimeText || `Serving till ${event.timing.endTime}`}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Crowd: {event.crowdLevel}
              </span>
            </div>

            {/* Voting Widget */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-slate-300">Is food still being served?</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(event.id, 'yes')}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                    event.votes.userVoted === 'yes'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes ({event.votes.yes})</span>
                </button>
                <button
                  onClick={() => handleVote(event.id, 'no')}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                    event.votes.userVoted === 'no'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No ({event.votes.no})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub Tab Switcher: Menu vs Lost & Found */}
          <div className="flex items-center border-b border-slate-800">
            <button
              onClick={() => setActiveSubTab('menu')}
              className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition ${
                activeSubTab === 'menu'
                  ? 'border-brand-500 text-brand-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              🍲 Live Menu ({event.menu.length})
            </button>
            <button
              onClick={() => setActiveSubTab('lostfound')}
              className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition flex items-center justify-center gap-1 ${
                activeSubTab === 'lostfound'
                  ? 'border-brand-500 text-brand-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <PackageSearch className="w-3.5 h-3.5" />
              Lost & Found ({eventLostItems.length})
            </button>
          </div>

          {/* Sub Tab 1: Menu Items & GymRat AI Shortcuts */}
          {activeSubTab === 'menu' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Items Available Today</span>
                <button
                  onClick={() => {
                    const allFood = event.menu.map((m) => m.name).join(', ');
                    setMacroPreselectedFood(allFood);
                    setIsMacroModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-xs text-amber-400 font-bold hover:underline"
                >
                  <Dumbbell className="w-3.5 h-3.5" />
                  Calc Full Meal Macros
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {event.menu.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-100">{item.name}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Est. {item.estimatedCalories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMacroPreselectedFood(item.name);
                        setIsMacroModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1 transition"
                      title="Analyze with GymRat AI"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      AI
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Tab 2: Lost & Found */}
          {activeSubTab === 'lostfound' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Reported Items at Venue</span>
                <button
                  onClick={() => setIsAddingLostItem(!isAddingLostItem)}
                  className="text-xs bg-brand-500 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-brand-600 transition"
                >
                  {isAddingLostItem ? 'Cancel' : '+ Report Item'}
                </button>
              </div>

              {isAddingLostItem && (
                <form onSubmit={handleCreateLostItem} className="bg-slate-800 p-3 rounded-xl space-y-2 border border-slate-700">
                  <input
                    type="text"
                    placeholder="Item Title (e.g., Red Wallet, Key)"
                    value={newLostTitle}
                    onChange={(e) => setNewLostTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    required
                  />
                  <textarea
                    placeholder="Description / Where found or lost"
                    value={newLostDesc}
                    onChange={(e) => setNewLostDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    rows={2}
                  />
                  <input
                    type="text"
                    placeholder="Contact Phone Number"
                    value={newLostContact}
                    onChange={(e) => setNewLostContact(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <button type="submit" className="w-full bg-emerald-600 font-bold text-xs py-1.5 rounded-lg text-white">
                    Submit Report
                  </button>
                </form>
              )}

              {eventLostItems.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No lost items reported for this event yet.</p>
              ) : (
                <div className="space-y-2">
                  {eventLostItems.map((item) => (
                    <div key={item.id} className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-300">{item.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'Resolved'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{item.description}</p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                        <span>Contact: {item.contactPhone}</span>
                        {item.status === 'Reported' && (
                          <button
                            onClick={() => resolveLostFoundItem(item.id)}
                            className="text-emerald-400 font-bold hover:underline"
                          >
                            Mark Resolved ✓
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Action CTAs */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                setVolunteerEventTarget(event);
                setIsVolunteerModalOpen(true);
              }}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 text-slate-200 transition"
            >
              <Users className="w-4 h-4 text-brand-400" />
              Apply to Volunteer
            </button>
            <a
              href={`tel:${event.organizer.phone || '+919876543210'}`}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-emerald-400"
              title="Call Organizer"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
