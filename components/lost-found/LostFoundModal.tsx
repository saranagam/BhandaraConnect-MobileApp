'use client';

import React, { useState } from 'react';
import { X, PackageSearch, PlusCircle, CheckCircle2, Phone, MapPin, Sparkles } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

interface LostFoundModalProps {
  onClose: () => void;
}

export const LostFoundModal: React.FC<LostFoundModalProps> = ({ onClose }) => {
  const { lostFoundItems, events, addLostFoundItem, resolveLostFoundItem } = useBhandara();

  const [isReporting, setIsReporting] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Wallet' | 'Keys' | 'Phone' | 'ID Card' | 'Bag' | 'Other'>('Wallet');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const categories = ['Wallet', 'Keys', 'Phone', 'ID Card', 'Bag', 'Other'] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contactPhone.trim()) return;

    const matchedEvent = events.find((e) => e.id === selectedEventId) || events[0];

    addLostFoundItem({
      eventId: matchedEvent.id,
      eventTitle: matchedEvent.title,
      title,
      description: description || 'Item reported lost near bhandara counters.',
      category,
      contactName: contactName || 'Community Member',
      contactPhone,
    });

    setIsReporting(false);
    setTitle('');
    setDescription('');
    setContactPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 max-w-md mx-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full p-5 shadow-2xl space-y-4 no-scrollbar max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PackageSearch className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-white">Community Lost & Found Desk</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Report Form vs View List */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            {isReporting ? 'Report New Lost/Found Item' : `Active Reports (${lostFoundItems.length})`}
          </span>
          <button
            onClick={() => setIsReporting(!isReporting)}
            className="text-xs bg-brand-500 hover:bg-brand-600 text-white font-bold px-3 py-1.5 rounded-xl shadow transition"
          >
            {isReporting ? 'View Active List' : '+ Report Item'}
          </button>
        </div>

        {isReporting ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tag Bhandara Location</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} ({ev.location.address.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Item Category</label>
              <div className="grid grid-cols-3 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                      category === cat
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Item Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Black Leather Wallet / Honda Key"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Details & Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Found near shoe rack counter at 2:30 PM..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 font-medium"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Sevadar Rohan"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-brand-500 hover:from-amber-600 hover:to-brand-600 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg transition active:scale-95"
            >
              Submit Report
            </button>
          </form>
        ) : (
          <div className="space-y-2.5">
            {lostFoundItems.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No active lost or found items reported.</p>
            ) : (
              lostFoundItems.map((item) => (
                <div key={item.id} className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-amber-300">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.eventTitle}</p>
                    </div>
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

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{item.contactPhone}</span>
                    </div>
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
