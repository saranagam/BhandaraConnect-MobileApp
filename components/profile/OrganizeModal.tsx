'use client';

import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';
import { MealCategory } from '@/types/bhandara';

interface OrganizeModalProps {
  onClose: () => void;
}

export const OrganizeModal: React.FC<OrganizeModalProps> = ({ onClose }) => {
  const { addEvent } = useBhandara();

  const [title, setTitle] = useState('');
  const [organizerName, setOrganizerName] = useState('Shree Sanatan Seva Samiti');
  const [address, setAddress] = useState('');
  const [mealType, setMealType] = useState<MealCategory>('Lunch');
  const [startTime, setStartTime] = useState('12:00 PM');
  const [endTime, setEndTime] = useState('04:30 PM');
  const [packingAvailable, setPackingAvailable] = useState(true);
  const [menuItemsText, setMenuItemsText] = useState('Puri Sabzi, Kheer, Halwa');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80'
  );
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim()) return;

    const items = menuItemsText.split(',').map((name, idx) => ({
      id: `m-${Date.now()}-${idx}`,
      name: name.trim(),
      category: 'Main' as const,
      estimatedCalories: 220,
      protein: 5,
      carbs: 30,
      fat: 9,
      isPopular: true,
    }));

    addEvent({
      title,
      organizer: {
        name: organizerName,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        totalMealsServed: 25000,
        phone: '+91 98765 43210',
      },
      location: {
        address,
        lat: 28.6315 + (Math.random() - 0.5) * 0.05,
        lng: 77.2167 + (Math.random() - 0.5) * 0.05,
        distanceKm: Math.round((Math.random() * 3 + 0.5) * 10) / 10,
        landmark: 'Near Central Park',
      },
      timing: {
        startTime,
        endTime,
        date: 'Today',
        isLiveNow: true,
        remainingTimeText: `Serves till ${endTime}`,
      },
      menu: items,
      packingAvailable,
      hygieneRating: 4.8,
      crowdLevel: 'Moderate',
      mealType,
      image,
      description: description || 'Fresh community food drive serving hot nutritious meal.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 max-w-md mx-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full p-5 shadow-2xl space-y-4 no-scrollbar max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand-500" />
            <h3 className="font-extrabold text-base text-white">Host a Bhandara Drive</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Bhandara Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mahavir Jayanti Mahaprasad Seva"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          {/* Location Address */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" /> Location Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Gate 3, Connaught Place, New Delhi"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          {/* Menu Items (comma separated) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Menu Items (Comma Separated)</label>
            <input
              type="text"
              value={menuItemsText}
              onChange={(e) => setMenuItemsText(e.target.value)}
              placeholder="Desi Ghee Puri, Aloo Curry, Kheer, Halwa"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          {/* Meal Category & Packing Options */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              >
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Prasad">Special Prasad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Packing Available?</label>
              <button
                type="button"
                onClick={() => setPackingAvailable(!packingAvailable)}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 ${
                  packingAvailable
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                {packingAvailable ? 'Yes (Allowed)' : 'No (Dine-in only)'}
              </button>
            </div>
          </div>

          {/* Timing */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Mahaprasad serving hot Puri Sabzi with clean seating arrangements."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              rows={2}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            Publish Bhandara Drive Live
          </button>
        </form>
      </div>
    </div>
  );
};
