'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBhandara } from '@/context/BhandaraContext';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { CategoryFilter } from '@/components/explore/CategoryFilter';
import { EventCard } from '@/components/explore/EventCard';
import { DynamicMap } from '@/components/explore/DynamicMap';
import { EventDrawer } from '@/components/explore/EventDrawer';
import { ReelsFeed } from '@/components/feed/ReelsFeed';
import { PostUpdateModal } from '@/components/feed/PostUpdateModal';
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView';
import { VolunteerModal } from '@/components/leaderboard/VolunteerModal';
import { ProfileView } from '@/components/profile/ProfileView';
import { OrganizeModal } from '@/components/profile/OrganizeModal';
import { GymRatMacroModal } from '@/components/ai/GymRatMacroModal';
import { LostFoundModal } from '@/components/lost-found/LostFoundModal';
import { Search, Compass, MapPin } from 'lucide-react';

export default function Home() {
  const {
    activeTab,
    viewMode,
    events,
    selectedRadius,
    selectedCategory,
    searchQuery,
    selectedEvent,
    setSelectedEvent,
    isMacroModalOpen,
    setIsMacroModalOpen,
    isPostReelModalOpen,
    setIsPostReelModalOpen,
    isOrganizeModalOpen,
    setIsOrganizeModalOpen,
    isVolunteerModalOpen,
    setIsVolunteerModalOpen,
    isLostFoundModalOpen,
    setIsLostFoundModalOpen,
  } = useBhandara();

  // Filter Events based on Search, Radius, and Meal Category
  const filteredEvents = events.filter((ev) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchAddress = ev.location.address.toLowerCase().includes(q);
      const matchMenu = ev.menu.some((m) => m.name.toLowerCase().includes(q));
      if (!matchTitle && !matchAddress && !matchMenu) return false;
    }

    // Radius filter (0 = all)
    if (selectedRadius > 0 && ev.location.distanceKm > selectedRadius) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && ev.mealType !== selectedCategory) {
      return false;
    }

    return true;
  });

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#FAF9F6] text-stone-900 pb-20 relative overflow-x-hidden">
      {/* Header Bar */}
      <Header />

      {/* Animated Tab Views */}
      <AnimatePresence mode="wait">
        {activeTab === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <CategoryFilter />

            {viewMode === 'list' ? (
              <div className="p-4 space-y-3">
                {filteredEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 px-4 space-y-3 bg-white rounded-2xl border border-stone-200 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-sm text-stone-900">No Bhandaras Found</h3>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Try adjusting your distance radius or search keywords to find active community meals.
                    </p>
                  </motion.div>
                ) : (
                  filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                )}
              </div>
            ) : (
              <div className="p-4 flex-1">
                <DynamicMap events={filteredEvents} />
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'feed' && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ReelsFeed />
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LeaderboardView />
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals & Drawers with AnimatePresence */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}

        {isMacroModalOpen && (
          <GymRatMacroModal onClose={() => setIsMacroModalOpen(false)} />
        )}

        {isPostReelModalOpen && (
          <PostUpdateModal onClose={() => setIsPostReelModalOpen(false)} />
        )}

        {isVolunteerModalOpen && (
          <VolunteerModal onClose={() => setIsVolunteerModalOpen(false)} />
        )}

        {isOrganizeModalOpen && (
          <OrganizeModal onClose={() => setIsOrganizeModalOpen(false)} />
        )}

        {isLostFoundModalOpen && (
          <LostFoundModal onClose={() => setIsLostFoundModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
