export interface Salon {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  area: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  gallery_urls: string[];
  rating: number;
  review_count: number;
  price_range: 'budget' | 'moderate' | 'premium';
  is_women_owned: boolean;
  is_verified: boolean;
  trust_score: number;
  features: string[];
  opening_time: string;
  closing_time: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  salon_id: string;
  name: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  price: number;
  original_price: number | null;
  is_student_deal: boolean;
  is_popular: boolean;
  image_url: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'salon_owner' | 'admin';
  glow_score: number;
  hair_score: number;
  skin_score: number;
  confidence_score: number;
  beauty_concerns: string[];
  skin_type: string | null;
  hair_type: string | null;
  preferred_styles: string[];
  is_student: boolean;
  location?: string | null;
  college?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  salon_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  salon_id: string;
  rating: number;
  comment: string | null;
  ai_summary: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  sort_order: number;
}

export interface BeautyRoutine {
  id: string;
  user_id: string;
  name: string;
  occasion: string;
  steps: RoutineStep[];
  total_duration: number;
  total_budget: number;
  created_at: string;
}

export interface RoutineStep {
  step: number;
  type: string;
  service: string;
  salon: string;
  timing: string;
  duration: number;
  price: number;
  tips?: string;
}

export interface SavedSalon {
  id: string;
  user_id: string;
  salon_id: string;
  created_at: string;
}

export interface OccasionPlan {
  occasion: string;
  timeline: RoutineStep[];
  budget: {
    min: number;
    max: number;
    breakdown: { item: string; cost: number }[];
  };
  recommendations: {
    salons: Salon[];
    services: Service[];
  };
  checklist: string[];
  tips: string[];
}

export interface GlowScoreBreakdown {
  overall: number;
  hair: number;
  skin: number;
  confidence: number;
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: string;
}
