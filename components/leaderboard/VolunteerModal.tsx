'use client';

import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

interface VolunteerModalProps {
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ onClose }) => {
  const { events, volunteerEventTarget, applyVolunteer } = useBhandara();

  const [selectedEventId, setSelectedEventId] = useState(volunteerEventTarget?.id || events[0]?.id || '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Serving');
  const [submitted, setSubmitted] = useState(false);

  const roles = ['Serving', 'Food Prep & Cooking', 'Crowd Management', 'Clean-up & Sanitation'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    applyVolunteer({
      eventId: selectedEventId,
      name,
      phone,
      role,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 max-w-md mx-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full p-5 shadow-2xl space-y-4 no-scrollbar max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-brand-500" />
            <h3 className="font-extrabold text-base text-white">Apply to Volunteer</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Application Received!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Thank you for stepping forward! The organizer will contact you shortly on WhatsApp/Phone.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-brand-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-brand-600 transition"
              >
                Close & Return to App
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Select Bhandara Drive</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} ({ev.location.address.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Volunteer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number (WhatsApp)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
                required
              />
            </div>

            {/* Preferred Role */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Preferred Volunteer Role</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                      role === r
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm'
                        : 'bg-slate-800 border-slate-700/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Confirm Volunteer Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
