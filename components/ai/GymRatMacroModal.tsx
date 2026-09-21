'use client';

import React, { useState, useEffect } from 'react';
import { X, Dumbbell, Sparkles, Upload, Flame, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useBhandara } from '@/context/BhandaraContext';
import { MacroResult } from '@/types/bhandara';

interface GymRatMacroModalProps {
  onClose: () => void;
}

export const GymRatMacroModal: React.FC<GymRatMacroModalProps> = ({ onClose }) => {
  const { macroPreselectedFood, setMacroPreselectedFood } = useBhandara();

  const [foodInput, setFoodInput] = useState(macroPreselectedFood || 'Desi Ghee Puri, Aloo Curry & Kheer');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MacroResult | null>(null);

  const sampleFoods = [
    { name: 'Desi Ghee Puri & Aloo Tamatar', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80' },
    { name: 'Kadhi Chawal & Pakoda', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80' },
    { name: 'Special Kesar Kheer', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80' },
    { name: 'Bedmi Puri & Moong Dal Halwa', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/macro-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodName: foodInput,
          imageBase64: selectedImage || undefined,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
      } else {
        throw new Error('Could not calculate macros');
      }
    } catch (err) {
      // Direct client fallback if network error
      setResult({
        foodItem: foodInput,
        calories: 520,
        protein: 11,
        carbs: 68,
        fat: 20,
        verdict: 'Heavy glycogen refeed fuel! Great for leg day pump. Drink a 1 scoop protein shake later! 🏋️‍♂️💪',
        healthScore: 7.8,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-600 text-slate-950 font-bold shadow-md">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-1.5">
                GymRat AI Macro Calculator
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400">Powered by Gemini 1.5 Flash Vision</p>
            </div>
          </div>
          <button
            onClick={() => {
              setMacroPreselectedFood(undefined);
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Menu Item / Bhandara Plate</label>
            <input
              type="text"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              placeholder="e.g., 2 Puri + Aloo Sabzi + 1 Bowl Kheer"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 font-medium"
              required
            />
          </div>

          {/* Quick Select Food Plate Samples */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Select Sample Plate / Snap Photo</label>
            <div className="grid grid-cols-2 gap-2">
              {sampleFoods.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFoodInput(s.name);
                    setSelectedImage(s.img);
                  }}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-left transition ${
                    foodInput === s.name
                      ? 'bg-brand-500/20 border-brand-500 text-white'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <img src={s.img} alt={s.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                  <span className="text-[10px] font-bold line-clamp-1">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Custom Image */}
          <div className="pt-1">
            <label className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 py-2 rounded-xl cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload Custom Plate Image</span>
              <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                Analyzing Macros with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Estimate Plate Macros & Gym Verdict
              </>
            )}
          </button>
        </form>

        {/* Results Card */}
        {result && (
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-brand-500/40 p-4 rounded-2xl shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-extrabold text-xs text-brand-400 uppercase tracking-wider">
                Macro Breakdown: {result.foodItem}
              </h4>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Health Score: {result.healthScore}/10
              </span>
            </div>

            {/* Macro Stats Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Calories</span>
                <p className="text-sm font-black text-amber-400">{result.calories}</p>
                <span className="text-[9px] text-slate-400">kcal</span>
              </div>
              <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Protein</span>
                <p className="text-sm font-black text-emerald-400">{result.protein}g</p>
                <span className="text-[9px] text-slate-400">muscle</span>
              </div>
              <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Carbs</span>
                <p className="text-sm font-black text-sky-400">{result.carbs}g</p>
                <span className="text-[9px] text-slate-400">energy</span>
              </div>
              <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Fats</span>
                <p className="text-sm font-black text-rose-400">{result.fat}g</p>
                <span className="text-[9px] text-slate-400">lipids</span>
              </div>
            </div>

            {/* Gym Rat Verdict */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
                <Dumbbell className="w-4 h-4" />
                <span>Gym-Rat Verdict:</span>
              </div>
              <p className="text-xs text-slate-200 font-medium italic leading-relaxed">{result.verdict}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
