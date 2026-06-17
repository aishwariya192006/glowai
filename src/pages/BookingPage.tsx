import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  MessageCircle,
  Check,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Input } from '../components/ui';
import { api } from '../lib/api';
import { useApp } from '../context/AppContext';
import type { Salon, Service } from '../types';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

export function BookingPage() {
  const { salonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  useEffect(() => {
    if (salonId) loadData();
    const preselectedService = searchParams.get('service');
    if (preselectedService) {
      setSelectedServices([preselectedService]);
    }
  }, [salonId]);

  const loadData = async () => {
    try {
      const [salonData, servicesData] = await Promise.all([
        api.getSalon(salonId!),
        api.getServices({ salon_id: salonId! }),
      ]);
      setSalon(salonData);
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load booking data:', error);
    } finally {
      setLoading(false);
    }

    if (user) {
      setGuestName(user.name);
      setGuestPhone(user.phone || '');
      setGuestEmail(user.email);
    }
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.duration_minutes || 0);
    }, 0);
  };

  const handleBooking = async () => {
    if (!salon || selectedServices.length === 0 || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      let userId = user?.id;

      if (!user) {
        const insertedUser = await api.upsertUser({
          email: guestEmail,
          name: guestName,
          phone: guestPhone,
          role: 'customer',
          glow_score: Math.floor(Math.random() * 30) + 60,
        });
        userId = insertedUser.id;
        setUser(insertedUser);
      }

      for (const serviceId of selectedServices) {
        await api.createBooking({
          user_id: userId,
          salon_id: salon.id,
          service_id: serviceId,
          booking_date: selectedDate,
          booking_time: selectedTime,
          status: 'confirmed',
          total_price: getTotalPrice(),
          notes,
        });
      }

      setStep(4);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  s <= step ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <GlassCard className="p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <img
                  src={salon.gallery_urls[0] || ''}
                  alt={salon.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">{salon.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{salon.area}</p>
              </div>
            </div>
          </GlassCard>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  Select Services
                </h2>

                <div className="space-y-3">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => {
                        setSelectedServices((prev) =>
                          prev.includes(service.id)
                            ? prev.filter((id) => id !== service.id)
                            : [...prev, service.id]
                        );
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selectedServices.includes(service.id)
                          ? 'bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500'
                          : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {service.name}
                          {service.duration_minutes < 60 && (
                            <Badge variant="success" className="ml-2">Quick Service</Badge>
                          )}
                          {service.is_student_deal && (
                            <Badge variant="warning" className="ml-2">Student Deal</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {service.duration_minutes} mins
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ₹{service.price.toLocaleString()}
                        </p>
                        {service.original_price && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{service.original_price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-rose-500">₹{getTotalPrice().toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Duration: {getTotalDuration()} mins</p>
                </div>
                <Button
                  variant="primary"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-rose-500" />
                  Select Date & Time
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const dateStr = date.toISOString().split('T')[0];
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = date.getDate();

                      return (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            selectedDate === dateStr
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          <p className="text-xs">{dayName}</p>
                          <p className="text-lg font-bold">{dayNum}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedTime === time
                            ? 'bg-rose-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-500" />
                  Your Details
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                      placeholder="Any special requests or notes..."
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Services:</span>
                        <span className="font-medium">{selectedServices.length} selected</span>
                      </p>
                      <p className="flex justify-between items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" /> Date:
                        </span>
                        <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                      </p>
                      <p className="flex justify-between items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" /> Time:
                        </span>
                        <span className="font-medium">{selectedTime}</span>
                      </p>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="flex justify-between">
                          <span className="font-semibold">Total Amount:</span>
                          <span className="font-bold text-rose-500 text-lg">
                            ₹{getTotalPrice().toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={!guestName || !guestPhone || !guestEmail}
                  loading={isSubmitting}
                  onClick={handleBooking}
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <GlassCard className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your appointment has been booked successfully. You'll receive a confirmation
                  shortly.
                </p>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-left mb-6">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Date:</span>{' '}
                      <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Time:</span>{' '}
                      <span className="font-semibold">{selectedTime}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Salon:</span>{' '}
                      <span className="font-semibold">{salon.name}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Total:</span>{' '}
                      <span className="font-bold text-rose-500">₹{getTotalPrice().toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button variant="primary">View My Bookings</Button>
                  </Link>
                  <Link to="/discover">
                    <Button variant="outline">Book Another</Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
