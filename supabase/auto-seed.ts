import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://euzlymnmrriqclymlbzh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mR67LzEcNPkqBSoCSu4GcA_UGzq2zK_';
const supabase = createClient(supabaseUrl, supabaseKey);

const DUMMY_SALONS = [
  {
    name: 'Luxe Glow Studio',
    address: '123 Anna Salai',
    city: 'Chennai',
    area: 'Teynampet',
    rating: 4.9,
    review_count: 245,
    place_id: 'luxe-glow-123',
    is_verified: true,
    price_range: 'premium',
    features: ['Parking', 'AC', 'Wifi'],
    opening_time: '09:00:00',
    closing_time: '20:00:00',
    gallery_urls: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80'],
    logo_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
  },
  {
    name: 'Divine Looks Hair & Beauty',
    address: '45 Besant Nagar Beach Road',
    city: 'Chennai',
    area: 'Besant Nagar',
    rating: 4.8,
    review_count: 198,
    place_id: 'divine-looks-45',
    is_verified: true,
    price_range: 'moderate',
    features: ['AC', 'Wifi'],
    opening_time: '10:00:00',
    closing_time: '21:00:00',
    gallery_urls: ['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80'],
    logo_url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Radiance Wellness Spa',
    address: '88 OMR IT Expressway',
    city: 'Chennai',
    area: 'Sholinganallur',
    rating: 4.7,
    review_count: 156,
    place_id: 'radiance-spa-88',
    is_verified: true,
    price_range: 'premium',
    features: ['Parking', 'AC', 'Spa'],
    opening_time: '08:00:00',
    closing_time: '22:00:00',
    gallery_urls: ['https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80'],
    logo_url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80',
  }
];

async function seedData() {
  console.log('1. Inserting premium salons into database...');
  const importedSalons = [];
  
  for (const salonData of DUMMY_SALONS) {
    const { data: savedSalon, error } = await supabase.from('salons').upsert(salonData, { onConflict: 'place_id' }).select().single();
    if (error) {
      console.error('Error saving salon:', error.message);
    } else if (savedSalon) {
      importedSalons.push(savedSalon);
    }
  }
  
  console.log(`✅ Saved ${importedSalons.length} premium salons to database.`);
  
  console.log('2. Reading Kaggle dataset for services...');
  const csvPath = path.join(process.cwd(), 'backend', 'kaggle_dataset.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(l => l.trim().length > 0).slice(1);
  
  const serviceStats: Record<string, { totalBudget: number, count: number }> = {};
  for (const line of lines) {
    const parts = line.split(',');
    if (parts.length >= 8) {
      const budget = parseInt(parts[4]) || 1000;
      const serviceName = parts[7].trim();
      if (!serviceStats[serviceName]) serviceStats[serviceName] = { totalBudget: 0, count: 0 };
      serviceStats[serviceName].totalBudget += budget;
      serviceStats[serviceName].count += 1;
    }
  }
  
  const uniqueServices = Object.keys(serviceStats).map(name => ({
    name,
    averagePrice: Math.round(serviceStats[name].totalBudget / serviceStats[name].count)
  }));
  
  console.log(`3. Extracted ${uniqueServices.length} unique services. Attaching to salons...`);
  
  let totalInserted = 0;
  for (const salon of importedSalons) {
    const numServices = Math.floor(Math.random() * 5) + 6; // 6 to 10 services per salon
    const shuffledServices = [...uniqueServices].sort(() => 0.5 - Math.random()).slice(0, numServices);
    
    const servicesToInsert = shuffledServices.map(service => {
      let category = 'Other';
      const nameLower = service.name.toLowerCase();
      if (nameLower.includes('hair') || nameLower.includes('keratin') || nameLower.includes('scalp')) category = 'Hair Care';
      else if (nameLower.includes('facial') || nameLower.includes('peel') || nameLower.includes('glow')) category = 'Skin Care';
      
      return {
        salon_id: salon.id,
        name: service.name,
        category: category,
        duration_minutes: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
        price: service.averagePrice,
      };
    });
    
    const { error } = await supabase.from('services').insert(servicesToInsert);
    if (!error) {
      totalInserted += servicesToInsert.length;
    } else {
      console.error('Error inserting services:', error.message);
    }
  }
  
  console.log(`✅ Successfully imported ${totalInserted} services from your Kaggle dataset!`);
}

seedData();
