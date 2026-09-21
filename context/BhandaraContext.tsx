'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BhandaraEvent, ReelPost, LeaderboardUser, LostFoundItem } from '@/types/bhandara';
import { INITIAL_BHANDARAS, INITIAL_REELS, INITIAL_LEADERBOARD, INITIAL_LOST_FOUND } from '@/data/mockBhandaras';

interface BhandaraContextType {
  events: BhandaraEvent[];
  reels: ReelPost[];
  leaderboard: LeaderboardUser[];
  lostFoundItems: LostFoundItem[];
  
  // Navigation & View State
  activeTab: 'explore' | 'feed' | 'leaderboard' | 'profile';
  setActiveTab: (tab: 'explore' | 'feed' | 'leaderboard' | 'profile') => void;
  
  viewMode: 'list' | 'map';
  setViewMode: (mode: 'list' | 'map') => void;
  
  selectedRadius: number; // in km, e.g. 1, 3, 5, 0 (0 for all)
  setSelectedRadius: (radius: number) => void;
  
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Drawer / Modal States
  selectedEvent: BhandaraEvent | null;
  setSelectedEvent: (event: BhandaraEvent | null) => void;
  
  isMacroModalOpen: boolean;
  setIsMacroModalOpen: (open: boolean) => void;
  macroPreselectedFood?: string;
  setMacroPreselectedFood: (food?: string) => void;
  
  isPostReelModalOpen: boolean;
  setIsPostReelModalOpen: (open: boolean) => void;
  
  isOrganizeModalOpen: boolean;
  setIsOrganizeModalOpen: (open: boolean) => void;
  
  isVolunteerModalOpen: boolean;
  setIsVolunteerModalOpen: (open: boolean) => void;
  volunteerEventTarget?: BhandaraEvent | null;
  setVolunteerEventTarget: (event: BhandaraEvent | null) => void;

  isLostFoundModalOpen: boolean;
  setIsLostFoundModalOpen: (open: boolean) => void;
  
  // Actions
  handleVote: (eventId: string, voteType: 'yes' | 'no') => void;
  toggleLikeReel: (reelId: string) => void;
  addReel: (newReel: Omit<ReelPost, 'id' | 'likes' | 'timestamp'>) => void;
  addEvent: (newEvent: Omit<BhandaraEvent, 'id' | 'votes'>) => void;
  addLostFoundItem: (item: Omit<LostFoundItem, 'id' | 'status' | 'dateReported'>) => void;
  resolveLostFoundItem: (itemId: string) => void;
  applyVolunteer: (application: { eventId: string; name: string; phone: string; role: string }) => void;
}

const BhandaraContext = createContext<BhandaraContextType | undefined>(undefined);

export const BhandaraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<BhandaraEvent[]>(INITIAL_BHANDARAS);
  const [reels, setReels] = useState<ReelPost[]>(INITIAL_REELS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(INITIAL_LOST_FOUND);
  
  const [activeTab, setActiveTab] = useState<'explore' | 'feed' | 'leaderboard' | 'profile'>('explore');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedRadius, setSelectedRadius] = useState<number>(0); // 0 = all radii
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [selectedEvent, setSelectedEvent] = useState<BhandaraEvent | null>(null);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState<boolean>(false);
  const [macroPreselectedFood, setMacroPreselectedFood] = useState<string | undefined>(undefined);
  
  const [isPostReelModalOpen, setIsPostReelModalOpen] = useState<boolean>(false);
  const [isOrganizeModalOpen, setIsOrganizeModalOpen] = useState<boolean>(false);
  
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState<boolean>(false);
  const [volunteerEventTarget, setVolunteerEventTarget] = useState<BhandaraEvent | null>(null);

  const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState<boolean>(false);

  // Load persistent state from localStorage if available
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('bhandara_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      
      const savedReels = localStorage.getItem('bhandara_reels');
      if (savedReels) setReels(JSON.parse(savedReels));

      const savedLF = localStorage.getItem('bhandara_lostfound');
      if (savedLF) setLostFoundItems(JSON.parse(savedLF));
    } catch (e) {
      console.error('Error loading local state', e);
    }
  }, []);

  const saveEvents = (updated: BhandaraEvent[]) => {
    setEvents(updated);
    try {
      localStorage.setItem('bhandara_events', JSON.stringify(updated));
    } catch (e) {}
  };

  const saveReels = (updated: ReelPost[]) => {
    setReels(updated);
    try {
      localStorage.setItem('bhandara_reels', JSON.stringify(updated));
    } catch (e) {}
  };

  const saveLostFound = (updated: LostFoundItem[]) => {
    setLostFoundItems(updated);
    try {
      localStorage.setItem('bhandara_lostfound', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleVote = (eventId: string, voteType: 'yes' | 'no') => {
    const updated = events.map((ev) => {
      if (ev.id === eventId) {
        if (ev.votes.userVoted === voteType) return ev; // already voted this
        const prevVote = ev.votes.userVoted;
        const yesCount = ev.votes.yes + (voteType === 'yes' ? 1 : 0) - (prevVote === 'yes' ? 1 : 0);
        const noCount = ev.votes.no + (voteType === 'no' ? 1 : 0) - (prevVote === 'no' ? 1 : 0);
        return {
          ...ev,
          votes: {
            yes: yesCount,
            no: noCount,
            userVoted: voteType,
          },
        };
      }
      return ev;
    });
    saveEvents(updated);

    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(updated.find((e) => e.id === eventId) || null);
    }
  };

  const toggleLikeReel = (reelId: string) => {
    const updated = reels.map((r) => {
      if (r.id === reelId) {
        const isLiked = !r.isLiked;
        return {
          ...r,
          isLiked,
          likes: isLiked ? r.likes + 1 : r.likes - 1,
        };
      }
      return r;
    });
    saveReels(updated);
  };

  const addReel = (newReelData: Omit<ReelPost, 'id' | 'likes' | 'timestamp'>) => {
    const newReel: ReelPost = {
      ...newReelData,
      id: `reel-${Date.now()}`,
      likes: 1,
      isLiked: true,
      timestamp: 'Just now',
    };
    saveReels([newReel, ...reels]);
  };

  const addEvent = (newEventData: Omit<BhandaraEvent, 'id' | 'votes'>) => {
    const newEvent: BhandaraEvent = {
      ...newEventData,
      id: `bhandara-${Date.now()}`,
      votes: { yes: 1, no: 0, userVoted: 'yes' },
    };
    saveEvents([newEvent, ...events]);
  };

  const addLostFoundItem = (itemData: Omit<LostFoundItem, 'id' | 'status' | 'dateReported'>) => {
    const newItem: LostFoundItem = {
      ...itemData,
      id: `lf-${Date.now()}`,
      status: 'Reported',
      dateReported: 'Just now',
    };
    saveLostFound([newItem, ...lostFoundItems]);
  };

  const resolveLostFoundItem = (itemId: string) => {
    const updated = lostFoundItems.map((item) =>
      item.id === itemId ? { ...item, status: 'Resolved' as const } : item
    );
    saveLostFound(updated);
  };

  const applyVolunteer = (app: { eventId: string; name: string; phone: string; role: string }) => {
    // Increase user volunteer score / show feedback
    setLeaderboard((prev) =>
      prev.map((user, idx) =>
        idx === 2 ? { ...user, points: user.points + 50, mealsServed: user.mealsServed + 100 } : user
      )
    );
  };

  return (
    <BhandaraContext.Provider
      value={{
        events,
        reels,
        leaderboard,
        lostFoundItems,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        selectedRadius,
        setSelectedRadius,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedEvent,
        setSelectedEvent,
        isMacroModalOpen,
        setIsMacroModalOpen,
        macroPreselectedFood,
        setMacroPreselectedFood,
        isPostReelModalOpen,
        setIsPostReelModalOpen,
        isOrganizeModalOpen,
        setIsOrganizeModalOpen,
        isVolunteerModalOpen,
        setIsVolunteerModalOpen,
        volunteerEventTarget,
        setVolunteerEventTarget,
        isLostFoundModalOpen,
        setIsLostFoundModalOpen,
        handleVote,
        toggleLikeReel,
        addReel,
        addEvent,
        addLostFoundItem,
        resolveLostFoundItem,
        applyVolunteer,
      }}
    >
      {children}
    </BhandaraContext.Provider>
  );
};

export const useBhandara = () => {
  const context = useContext(BhandaraContext);
  if (!context) {
    throw new Error('useBhandara must be used within a BhandaraProvider');
  }
  return context;
};
