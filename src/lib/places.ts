import { supabase } from './supabase';
import type { Salon } from '../types';

// OpenStreetMap (Nominatim) doesn't require an API key, but we must provide a User-Agent header
// to comply with their usage policy.
export async function searchPlacesAndImport(query: string, location?: string): Promise<Salon[]> {
  const searchQuery = `${query} ${location || ''}`.trim();
  
  // Nominatim Search API
  const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=10`;
  
  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'SalonBookingApp/1.0 (contact@example.com)' // Replace with your actual email in production
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from OpenStreetMap API');
  }

  const places = await response.json();
  const importedSalons: Salon[] = [];

  for (const place of places) {
    // OpenStreetMap doesn't have ratings or photos, so we provide fallback data
    const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Random rating between 3.5 and 5.0
    const randomReviewCount = Math.floor(Math.random() * 200) + 10;
    
    // Some basic formatting of the address
    const address = place.display_name || 'Unknown Address';
    const city = place.address?.city || place.address?.town || place.address?.village || location || 'Unknown City';

    const salonData: Partial<Salon> = {
      name: place.name || place.display_name.split(',')[0] || 'Unknown Salon',
      address: address,
      city: city,
      area: city,
      rating: parseFloat(randomRating),
      review_count: randomReviewCount,
      phone: null, // OSM rarely provides phone numbers in the basic search
      website: null,
      place_id: place.place_id.toString(),
      is_verified: true,
      price_range: 'moderate',
      features: [],
      opening_time: '09:00:00',
      closing_time: '20:00:00',
      gallery_urls: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80'
      ],
      logo_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
    };

    // Upsert the salon into Supabase using place_id to avoid duplicates
    const { data: savedSalon, error } = await supabase
      .from('salons')
      .upsert(salonData, { onConflict: 'place_id' })
      .select()
      .single();

    if (error) {
      console.error('Failed to save salon to Supabase:', error);
    } else if (savedSalon) {
      importedSalons.push(savedSalon as Salon);
    }
  }

  return importedSalons;
}
