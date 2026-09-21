export type CrowdLevel = 'Low' | 'Moderate' | 'Packed';
export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Prasad' | 'All';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Main' | 'Dessert' | 'Beverage' | 'Snack';
  description?: string;
  estimatedCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  isPopular?: boolean;
}

export interface BhandaraOrganizer {
  name: string;
  isVerified: boolean;
  avatar: string;
  totalMealsServed: number;
  phone?: string;
  badges?: string[];
}

export interface BhandaraEvent {
  id: string;
  title: string;
  organizer: BhandaraOrganizer;
  location: {
    address: string;
    lat: number;
    lng: number;
    distanceKm: number;
    landmark?: string;
  };
  timing: {
    startTime: string; // e.g., "12:00 PM"
    endTime: string;   // e.g., "04:30 PM"
    date: string;
    isLiveNow: boolean;
    remainingTimeText?: string;
  };
  menu: MenuItem[];
  packingAvailable: boolean;
  hygieneRating: number; // e.g. 4.8
  crowdLevel: CrowdLevel;
  mealType: MealCategory;
  votes: {
    yes: number;
    no: number;
    userVoted?: 'yes' | 'no' | null;
  };
  image: string;
  description: string;
  lostFoundCount?: number;
}

export interface ReelPost {
  id: string;
  eventId: string;
  eventTitle: string;
  locationName: string;
  mediaType: 'video' | 'image';
  mediaUrl: string;
  posterUrl?: string;
  caption: string;
  likes: number;
  isLiked?: boolean;
  authorName: string;
  authorAvatar: string;
  timestamp: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  type: 'donor' | 'volunteer';
  points: number;
  mealsServed: number;
  tierBadge: 'Seva Warrior' | 'Community Hero' | 'Prasad Samaritan' | 'Annadata Master';
  rank: number;
  verifiedCount?: number;
}

export interface LostFoundItem {
  id: string;
  eventId: string;
  eventTitle: string;
  title: string;
  description: string;
  category: 'Wallet' | 'Keys' | 'Phone' | 'ID Card' | 'Bag' | 'Other';
  status: 'Reported' | 'Resolved';
  dateReported: string;
  contactName: string;
  contactPhone: string;
  imageUrl?: string;
}

export interface MacroResult {
  foodItem: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  verdict: string;
  healthScore: number;
}
