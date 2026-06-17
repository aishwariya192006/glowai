import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Globe,
  Heart,
  Share2,
  BadgeCheck,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Calendar,
  TrendingUp,
  ThumbsUp,
  MessageCircle,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Rating, Progress, Modal } from '../components/ui';
import { api } from '../lib/api';
import type { Salon, Service, Review } from '../types';

export function SalonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (id) loadSalonData(id);
  }, [id]);

  const loadSalonData = async (salonId: string) => {
    try {
      const [salonData, servicesData, reviewsData] = await Promise.all([
        api.getSalon(salonId),
        api.getServices({ salon_id: salonId }),
        api.getReviews({ salon_id: salonId, limit: 10 }),
      ]);
      setSalon(salonData);
      setServices(servicesData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to load salon:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-rose-500"
        />
      </div>
    );
  }

  if (!salon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pt-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Salon not found</h1>
        <Link to="/discover">
          <Button className="mt-4">Back to Discover</Button>
        </Link>
      </div>
    );
  }

  const groupedServices = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, Service[]>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                {salon.gallery_urls.slice(0, 5).map((url, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedGallery(i)}
                    className={`relative overflow-hidden rounded-2xl ${
                      i === 0 ? 'col-span-2 row-span-2 aspect-video' : 'aspect-square'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${salon.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors" />
                  </motion.button>
                ))}
                {salon.gallery_urls.length > 5 && (
                  <button
                    onClick={() => setSelectedGallery(5)}
                    className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 dark:bg-gray-800"
                  >
                    <img
                      src={salon.gallery_urls[5]}
                      alt={`${salon.name} gallery 6`}
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold">+{salon.gallery_urls.length - 5}</span>
                    </div>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {salon.gallery_urls.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGallery(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedGallery === i
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Image {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <GlassCard className="p-6 sticky top-24">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {salon.is_verified && (
                        <Badge variant="success" icon={<BadgeCheck className="w-3 h-3" />}>
                          Verified
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {salon.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {salon.address}, {salon.area}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-rose-500" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <Rating rating={salon.rating} count={salon.review_count} size="lg" />
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Trust Score
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {salon.trust_score}/100
                    </span>
                  </div>
                  <Progress value={salon.trust_score} variant="success" />
                </div>

                {salon.is_women_owned && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 mb-6">
                    <Users className="w-10 h-10 rounded-xl bg-rose-500/20 p-2 text-rose-500" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Women-Owned Business
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Supporting women entrepreneurs
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>
                      Open: {salon.opening_time} - {salon.closing_time}
                    </span>
                  </div>
                  {salon.phone && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Phone className="w-5 h-5" />
                      <a href={`tel:${salon.phone}`} className="hover:text-rose-500">
                        {salon.phone}
                      </a>
                    </div>
                  )}
                  {salon.email && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Globe className="w-5 h-5" />
                      <a href={`mailto:${salon.email}`} className="hover:text-rose-500">
                        {salon.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {salon.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Calendar className="w-5 h-5" />}
                  onClick={() => navigate(`/booking/${salon.id}`)}
                >
                  Book Appointment
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Services & Pricing
            </h2>

            <GlassCard className="p-6 mb-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <Sparkles className="w-10 h-10 rounded-xl bg-amber-500/20 p-2 text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">AI Review Summary</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    This salon is highly rated for their organic treatments, professional staff, and
                    clean environment. Customers particularly love their bridal packages and
                    affordability.
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-6">
              {Object.entries(groupedServices).map(([category, categoryServices]) => (
                <GlassCard key={category} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categoryServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {service.name}
                            </h4>
                            {service.is_student_deal && (
                              <Badge variant="success">Student Deal</Badge>
                            )}
                            {service.is_popular && (
                              <Badge variant="warning">
                                <Star className="w-3 h-3 fill-current" /> Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {service.duration_minutes} mins
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-rose-500">
                            ₹{service.price.toLocaleString()}
                          </div>
                          {service.original_price && (
                            <div className="text-sm text-gray-400 line-through">
                              ₹{service.original_price.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/booking/${salon.id}?service=${service.id}`);
                          }}
                        >
                          Book
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Customer Reviews
          </h2>

          <GlassCard className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <p className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  {salon.rating}
                </p>
                <Rating rating={salon.rating} showCount={false} size="lg" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {salon.review_count} reviews
                </p>
              </div>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">{star}</span>
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <Progress value={percentage} size="sm" />
                    <span className="text-xs text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <GlassCard className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
              </GlassCard>
            ) : (
              reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold">
                          {review.id.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Customer</p>
                          <div className="flex items-center gap-2">
                            <Rating rating={review.rating} showCount={false} size="sm" />
                            <span className="text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.is_verified && (
                        <Badge variant="info" icon={<BadgeCheck className="w-3 h-3" />}>
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment || 'Great experience!'}</p>
                    {review.ai_summary && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{review.ai_summary}</span>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <Modal
        isOpen={selectedGallery !== null}
        onClose={() => setSelectedGallery(null)}
        size="xl"
      >
        <div className="relative">
          <button
            onClick={() => setSelectedGallery(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedGallery !== null && (
            <img
              src={salon.gallery_urls[selectedGallery]}
              alt={`${salon.name} gallery`}
              className="w-full rounded-2xl"
            />
          )}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() =>
                setSelectedGallery((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : salon.gallery_urls.length - 1) : null
                )
              }
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedGallery !== null ? selectedGallery + 1 : 1} / {salon.gallery_urls.length}
            </span>
            <button
              onClick={() =>
                setSelectedGallery((prev) =>
                  prev !== null ? (prev < salon.gallery_urls.length - 1 ? prev + 1 : 0) : null
                )
              }
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
