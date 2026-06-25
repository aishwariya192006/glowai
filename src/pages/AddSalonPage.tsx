import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Save, ArrowLeft } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard } from '../components/ui';
import { api } from '../lib/api';

export function AddSalonPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: 'Chennai',
    area: '',
    description: '',
    opening_time: '09:00',
    closing_time: '20:00',
    price_range: 'moderate' as 'budget' | 'moderate' | 'premium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.area) {
      alert('Please fill out the required fields (Name, Area)');
      return;
    }

    setLoading(true);
    try {
      await api.createSalon({
        ...formData,
        rating: 0,
        review_count: 0,
        is_women_owned: false,
        is_verified: false,
        trust_score: 0,
        features: [],
        gallery_urls: [],
      });
      alert('Salon added successfully!');
      navigate('/admin');
    } catch (error: any) {
      alert(`Failed to add salon: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-4" 
            onClick={() => navigate('/admin')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Admin Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Salon</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Enter the details of the new salon to add it to the platform.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Salon Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Luxe Glow Studio"
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Area / Neighborhood *
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g. Teynampet"
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description about the salon..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        name="opening_time"
                        value={formData.opening_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        name="closing_time"
                        value={formData.closing_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </label>
                    <select
                      name="price_range"
                      value={formData.price_range}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all dark:text-white"
                    >
                      <option value="budget">Budget (₹)</option>
                      <option value="moderate">Moderate (₹₹)</option>
                      <option value="premium">Premium (₹₹₹)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => navigate('/admin')}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={loading} icon={<Save className="w-4 h-4" />}>
                    {loading ? 'Saving...' : 'Save Salon'}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
