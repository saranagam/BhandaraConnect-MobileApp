'use client';

import React, { useState } from 'react';
import { X, Camera, MapPin, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';

interface PostUpdateModalProps {
  onClose: () => void;
}

export const PostUpdateModal: React.FC<PostUpdateModalProps> = ({ onClose }) => {
  const { events, addReel } = useBhandara();

  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [caption, setCaption] = useState('');
  const [previewImage, setPreviewImage] = useState(
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80'
  );
  const [authorName, setAuthorName] = useState('Volunteer Sevadar');

  const presetImages = [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const targetEvent = events.find((ev) => ev.id === selectedEventId) || events[0];

    addReel({
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      locationName: targetEvent.location.address.split(',')[0],
      mediaType: 'image',
      mediaUrl: previewImage,
      caption,
      authorName,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 max-w-md mx-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl space-y-4 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand-500" />
            <h3 className="font-extrabold text-base text-white">Post Live Bhandara Reel</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Media Preview & Custom File Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Reel Image / Video Preview</label>
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 bg-slate-950 flex items-center justify-center group">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition text-white">
                <Upload className="w-6 h-6 text-brand-400 mb-1" />
                <span className="text-xs font-bold">Change Photo</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {/* Quick preset selector */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
              {presetImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewImage(img)}
                  className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition ${
                    previewImage === img ? 'border-brand-500 scale-105' : 'border-slate-700 opacity-60'
                  }`}
                >
                  <img src={img} alt="Preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Location Tag Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              Tag Bhandara Location
            </label>
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

          {/* Author Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Name / Handle</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Sevadar Rahul"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          {/* Caption Text Area */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Caption & Live Update</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g., Hot Kheer distribution started! Queue is super clean and moving fast."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              rows={3}
              required
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            Publish Reel Live
          </button>
        </form>
      </div>
    </div>
  );
};
