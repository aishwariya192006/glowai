import 'dotenv/config';
import connectDB from './db.js';
import Salon from './models/Salon.js';
import Service from './models/Service.js';
import Category from './models/Category.js';
import User from './models/User.js';
import Review from './models/Review.js';
import bcrypt from 'bcryptjs';

const gallery = (seed) => [
  `https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${seed}`,
  `https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${seed + 1}`,
  `https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${seed + 2}`,
];

async function seed() {
  await connectDB();

  await Promise.all([
    Salon.deleteMany({}),
    Service.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({}),
    Review.deleteMany({}),
  ]);

  const categories = await Category.insertMany([
    { name: 'Hair', slug: 'hair', icon: 'scissors', description: 'Cuts, styling & treatments', sort_order: 1 },
    { name: 'Skin', slug: 'skin', icon: 'sparkles', description: 'Facials & skincare', sort_order: 2 },
    { name: 'Nails', slug: 'nails', icon: 'hand', description: 'Manicure & pedicure', sort_order: 3 },
    { name: 'Bridal', slug: 'bridal', icon: 'heart', description: 'Bridal makeup & packages', sort_order: 4 },
    { name: 'Spa', slug: 'spa', icon: 'leaf', description: 'Relaxation & wellness', sort_order: 5 },
  ]);

  const pexelsImages = [
    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993318/pexels-photo-3993318.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993471/pexels-photo-3993471.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993133/pexels-photo-3993133.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993319/pexels-photo-3993319.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993308/pexels-photo-3993308.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993130/pexels-photo-3993130.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993466/pexels-photo-3993466.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3992878/pexels-photo-3992878.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993314/pexels-photo-3993314.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const rawSalons = [
    {
      name: 'Luxe Glow Studio',
      description: 'Premium beauty studio specializing in bridal and occasion styling.',
      address: '12 Usman Road, T. Nagar',
      area: 'T. Nagar',
      city: 'Chennai',
      phone: '+91 44 2815 4321',
      email: 'hello@luxeglow.in',
      rating: 4.9,
      review_count: 312,
      price_range: 'premium',
      is_women_owned: true,
      is_verified: true,
      trust_score: 95,
      features: ['Bridal', 'AC Salon', 'Parking', 'Makeup'],
      opening_time: '10:00',
      closing_time: '20:00',
    },
    {
      name: 'Radiance Beauty Lounge',
      description: 'Trusted salon for everyday glam and student-friendly packages.',
      address: '45 Lattice Bridge Road, Adyar',
      area: 'Adyar',
      city: 'Chennai',
      phone: '+91 44 2446 7890',
      email: 'book@radiance.in',
      rating: 4.8,
      review_count: 245,
      price_range: 'moderate',
      is_women_owned: true,
      is_verified: true,
      trust_score: 88,
      features: ['Student Deals', 'Organic Products', 'Hair Care'],
      opening_time: '09:00',
      closing_time: '21:00',
    },
    {
      name: 'Divine Looks Studio',
      description: 'Award-winning stylists for hair transformations and skin care.',
      address: '78 2nd Avenue, Anna Nagar',
      area: 'Anna Nagar',
      city: 'Chennai',
      phone: '+91 44 2621 3344',
      email: 'info@divinelooks.in',
      rating: 4.9,
      review_count: 198,
      price_range: 'premium',
      is_women_owned: false,
      is_verified: true,
      trust_score: 92,
      features: ['Hair Color', 'Keratin', 'Spa'],
      opening_time: '10:00',
      closing_time: '22:00',
    },
    {
      name: 'Bloom Beauty Bar',
      description: 'Budget-friendly salon with great nail art and quick services.',
      address: '22 OMR Road, Sholinganallur',
      area: 'OMR',
      city: 'Chennai',
      phone: '+91 44 2496 1122',
      email: 'hi@bloombeauty.in',
      rating: 4.5,
      review_count: 156,
      price_range: 'budget',
      is_women_owned: true,
      is_verified: true,
      trust_score: 78,
      features: ['Nail Art', 'Walk-ins Welcome'],
      opening_time: '08:00',
      closing_time: '20:00',
    },
    {
      name: 'Style Sanctuary',
      description: 'Calm spa-like salon for facials, massages, and self-care.',
      address: '5 Luz Church Road, Mylapore',
      area: 'Mylapore',
      city: 'Chennai',
      phone: '+91 44 2498 5566',
      email: 'relax@stylesanctuary.in',
      rating: 4.7,
      review_count: 167,
      price_range: 'moderate',
      is_women_owned: true,
      is_verified: true,
      trust_score: 85,
      features: ['Spa', 'Facials', 'Aromatherapy'],
      opening_time: '09:00',
      closing_time: '21:00',
    },
    {
      name: 'Coastal Curls',
      description: 'Beach-side salon known for curly hair specialists and blowouts.',
      address: '18 Elliot Beach Road, Besant Nagar',
      area: 'Besant Nagar',
      city: 'Chennai',
      phone: '+91 44 2491 7788',
      email: 'curls@coastal.in',
      rating: 4.6,
      review_count: 134,
      price_range: 'moderate',
      is_women_owned: false,
      is_verified: true,
      trust_score: 82,
      features: ['Curly Hair', 'Blow Dry'],
      opening_time: '10:00',
      closing_time: '19:00',
    },
    {
      name: 'The Glamour Room',
      description: 'A chic space offering everything from quick touch-ups to full makeovers.',
      address: '101 Mount Road, T. Nagar',
      area: 'T. Nagar',
      city: 'Chennai',
      phone: '+91 44 2811 2233',
      email: 'glam@theglamourroom.in',
      rating: 4.8,
      review_count: 210,
      price_range: 'moderate',
      is_women_owned: true,
      is_verified: true,
      trust_score: 90,
      features: ['Makeover', 'Hair Styling', 'Nails'],
      opening_time: '09:30',
      closing_time: '20:30',
    },
    {
      name: 'Velvet Skin Clinic',
      description: 'Advanced skincare center providing holistic facial treatments.',
      address: '56 Blue Beach Rd, Besant Nagar',
      area: 'Besant Nagar',
      city: 'Chennai',
      phone: '+91 44 2491 9988',
      email: 'care@velvetskin.in',
      rating: 4.9,
      review_count: 420,
      price_range: 'premium',
      is_women_owned: true,
      is_verified: true,
      trust_score: 98,
      features: ['Skincare', 'Dermatology', 'Facials'],
      opening_time: '10:00',
      closing_time: '18:00',
    },
    {
      name: 'Nail Nirvana',
      description: 'Creative nail bar with the largest selection of gel and acrylics.',
      address: '12 IT Expressway, OMR',
      area: 'OMR',
      city: 'Chennai',
      phone: '+91 44 2496 5544',
      email: 'polish@nailnirvana.in',
      rating: 4.4,
      review_count: 112,
      price_range: 'budget',
      is_women_owned: true,
      is_verified: false,
      trust_score: 75,
      features: ['Nail Art', 'Acrylics', 'Pedicure'],
      opening_time: '11:00',
      closing_time: '21:00',
    },
    {
      name: 'Urban Retreat',
      description: 'A modern wellness sanctuary in the heart of the city.',
      address: '88 East Boulevard, Anna Nagar',
      area: 'Anna Nagar',
      city: 'Chennai',
      phone: '+91 44 2621 8877',
      email: 'booking@urbanretreat.in',
      rating: 4.7,
      review_count: 289,
      price_range: 'premium',
      is_women_owned: false,
      is_verified: true,
      trust_score: 89,
      features: ['Massage', 'Steam Room', 'Wellness'],
      opening_time: '08:00',
      closing_time: '22:00',
    },
    {
      name: 'Hair Masters',
      description: 'Expert colorists and stylists focused on precision cutting.',
      address: '33 Kasturi Rangan Road, Adyar',
      area: 'Adyar',
      city: 'Chennai',
      phone: '+91 44 2446 1122',
      email: 'style@hairmasters.in',
      rating: 4.5,
      review_count: 145,
      price_range: 'moderate',
      is_women_owned: false,
      is_verified: true,
      trust_score: 80,
      features: ['Balayage', 'Precision Cut'],
      opening_time: '09:00',
      closing_time: '20:00',
    },
    {
      name: 'Pure Beauty Bar',
      description: 'Using only 100% organic and cruelty-free products for all treatments.',
      address: '71 RK Salai, Mylapore',
      area: 'Mylapore',
      city: 'Chennai',
      phone: '+91 44 2498 7744',
      email: 'pure@beautybar.in',
      rating: 4.8,
      review_count: 310,
      price_range: 'premium',
      is_women_owned: true,
      is_verified: true,
      trust_score: 94,
      features: ['Organic', 'Vegan', 'Cruelty-Free'],
      opening_time: '10:00',
      closing_time: '19:30',
    },
    {
      name: 'Student Snippers',
      description: 'The go-to place for affordable and trendy haircuts for students.',
      address: '15 College Road, OMR',
      area: 'OMR',
      city: 'Chennai',
      phone: '+91 44 2496 9900',
      email: 'cuts@studentsnippers.in',
      rating: 4.2,
      review_count: 550,
      price_range: 'budget',
      is_women_owned: false,
      is_verified: false,
      trust_score: 70,
      features: ['Student Deals', 'Quick Cuts'],
      opening_time: '08:30',
      closing_time: '21:30',
    },
    {
      name: 'Bridal Elegance',
      description: 'Exclusive bridal packages and pre-wedding pampering sessions.',
      address: '90 South Boag Road, T. Nagar',
      area: 'T. Nagar',
      city: 'Chennai',
      phone: '+91 44 2815 6677',
      email: 'weddings@bridalelegance.in',
      rating: 4.9,
      review_count: 405,
      price_range: 'premium',
      is_women_owned: true,
      is_verified: true,
      trust_score: 96,
      features: ['Bridal', 'Mehendi', 'Saree Draping'],
      opening_time: '07:00',
      closing_time: '21:00',
    },
    {
      name: 'Gentlemens Grooming Lounge',
      description: 'Luxury grooming services for men including beard styling and classic shaves.',
      address: '44 Main Road, Anna Nagar',
      area: 'Anna Nagar',
      city: 'Chennai',
      phone: '+91 44 2621 1155',
      email: 'style@groominglounge.in',
      rating: 4.6,
      review_count: 230,
      price_range: 'moderate',
      is_women_owned: false,
      is_verified: true,
      trust_score: 86,
      features: ['Beard Styling', 'Men', 'Classic Shave'],
      opening_time: '09:00',
      closing_time: '22:00',
    }
  ];

  const salonsData = rawSalons.map((salon, index) => {
    const imageUrl = pexelsImages[index % pexelsImages.length];
    return {
      ...salon,
      logo_url: imageUrl,
      gallery_urls: [imageUrl, imageUrl, imageUrl],
    };
  });

  const salons = await Salon.insertMany(salonsData);

  const serviceTemplates = [
    { name: 'Haircut & Blow Dry', category: 'Hair', duration_minutes: 60, price: 899, is_popular: true },
    { name: 'Keratin Treatment', category: 'Hair', duration_minutes: 180, price: 4999, is_popular: true },
    { name: 'Classic Facial', category: 'Skin', duration_minutes: 45, price: 1299 },
    { name: 'Bridal Makeup', category: 'Bridal', duration_minutes: 120, price: 15000, is_popular: true },
    { name: 'Gel Manicure', category: 'Nails', duration_minutes: 45, price: 799 },
    { name: 'Full Body Massage', category: 'Spa', duration_minutes: 90, price: 2499 },
    {
      name: 'Student Haircut',
      category: 'Hair',
      duration_minutes: 30,
      price: 299,
      original_price: 499,
      is_student_deal: true,
    },
    {
      name: 'Student Facial',
      category: 'Skin',
      duration_minutes: 40,
      price: 499,
      original_price: 899,
      is_student_deal: true,
    },
  ];

  const services = [];
  for (const salon of salons) {
    for (const template of serviceTemplates) {
      services.push({
        salon_id: salon._id,
        ...template,
        description: `${template.name} at ${salon.name}`,
      });
    }
  }
  await Service.insertMany(services);

  const demoPassword = await bcrypt.hash('password123', 10);
  const demoUser = await User.create({
    email: 'demo@glowai.com',
    password: demoPassword,
    name: 'Demo User',
    phone: '+91 98765 43210',
    role: 'customer',
    glow_score: 72,
    hair_score: 75,
    skin_score: 68,
    confidence_score: 70,
    beauty_concerns: ['Acne', 'Dryness'],
    is_student: false,
  });

  await Review.insertMany([
    {
      user_id: demoUser._id,
      salon_id: salons[0]._id,
      rating: 5,
      comment: 'Amazing bridal makeup! Highly recommend Luxe Glow.',
      is_verified: true,
    },
    {
      user_id: demoUser._id,
      salon_id: salons[1]._id,
      rating: 4,
      comment: 'Great student deals and friendly staff.',
      is_verified: true,
    },
  ]);

  console.log('Database seeded successfully!');
  console.log(`  ${salons.length} salons`);
  console.log(`  ${services.length} services`);
  console.log(`  ${categories.length} categories`);
  console.log('  Demo login: demo@glowai.com / password123');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
