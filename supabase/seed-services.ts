import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://euzlymnmrriqclymlbzh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mR67LzEcNPkqBSoCSu4GcA_UGzq2zK_';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedServices() {
  console.log('Starting service import process...');
  
  // 1. Read Kaggle Dataset
  const csvPath = path.join(process.cwd(), 'backend', 'kaggle_dataset.csv');
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV not found at: ${csvPath}`);
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').filter(l => l.trim().length > 0);
  
  // Skip header
  const dataLines = lines.slice(1);
  
  // 2. Extract unique services and their average budgets
  const serviceStats: Record<string, { totalBudget: number, count: number }> = {};
  
  for (const line of dataLines) {
    const parts = line.split(',');
    if (parts.length >= 8) {
      const budget = parseInt(parts[4]) || 1000;
      const serviceName = parts[7].trim();
      
      if (!serviceStats[serviceName]) {
        serviceStats[serviceName] = { totalBudget: 0, count: 0 };
      }
      serviceStats[serviceName].totalBudget += budget;
      serviceStats[serviceName].count += 1;
    }
  }
  
  const uniqueServices = Object.keys(serviceStats).map(name => {
    return {
      name,
      averagePrice: Math.round(serviceStats[name].totalBudget / serviceStats[name].count)
    };
  });
  
  console.log(`Extracted ${uniqueServices.length} unique services from dataset.`);
  
  // 3. Fetch all salons
  const { data: salons, error: salonError } = await supabase.from('salons').select('id');
  
  if (salonError || !salons || salons.length === 0) {
    console.error('No salons found in database. Please import salons first!');
    return;
  }
  
  console.log(`Found ${salons.length} salons. Assigning services...`);
  
  // 4. Assign 4-8 random services to each salon
  let totalInserted = 0;
  
  for (const salon of salons) {
    const numServices = Math.floor(Math.random() * 5) + 4; // 4 to 8 services
    const shuffledServices = [...uniqueServices].sort(() => 0.5 - Math.random());
    const selectedServices = shuffledServices.slice(0, numServices);
    
    const servicesToInsert = selectedServices.map(service => {
      // Determine category based on service name keywords
      let category = 'Other';
      const nameLower = service.name.toLowerCase();
      if (nameLower.includes('hair') || nameLower.includes('keratin') || nameLower.includes('scalp')) category = 'Hair Care';
      else if (nameLower.includes('facial') || nameLower.includes('peel') || nameLower.includes('glow')) category = 'Skin Care';
      else if (nameLower.includes('massage') || nameLower.includes('spa')) category = 'Spa & Relaxation';
      
      return {
        salon_id: salon.id,
        name: service.name,
        category: category,
        duration_minutes: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
        price: service.averagePrice,
        is_popular: Math.random() > 0.7
      };
    });
    
    const { error: insertError } = await supabase.from('services').insert(servicesToInsert);
    
    if (insertError) {
      console.error(`Error inserting services for salon ${salon.id}:`, insertError.message);
    } else {
      totalInserted += servicesToInsert.length;
    }
  }
  
  console.log(`✅ Successfully imported ${totalInserted} services across all salons!`);
}

seedServices();
