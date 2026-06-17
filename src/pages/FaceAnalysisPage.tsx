import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Sparkles,
  Droplets,
  Sun,
  AlertCircle,
  Heart,
  Check,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Progress, Badge } from '../components/ui';
import { useToast } from '../context/ToastContext';

const skinMetrics = [
  { id: 'acne', label: 'Acne Score', icon: AlertCircle, color: 'from-red-400 to-rose-500', description: 'Measures acne and blemishes' },
  { id: 'pigmentation', label: 'Pigmentation', icon: Sun, color: 'from-amber-400 to-orange-500', description: 'Evaluates skin tone evenness' },
  { id: 'dryness', label: 'Dryness Score', icon: Droplets, color: 'from-blue-400 to-cyan-500', description: 'Assesses moisture levels' },
  { id: 'oiliness', label: 'Oiliness', icon: Sun, color: 'from-yellow-400 to-amber-500', description: 'Measures sebum production' },
  { id: 'health', label: 'Skin Health', icon: Heart, color: 'from-emerald-400 to-teal-500', description: 'Overall skin condition' },
];

const recommendedTreatments = [
  { name: 'Hydrating Facial', duration: '60 mins', price: 2499, match: 95 },
  { name: 'Chemical Peel', duration: '45 mins', price: 3999, match: 87 },
  { name: 'LED Light Therapy', duration: '30 mins', price: 1999, match: 82 },
];

const recommendedSalons = [
  { name: 'Luxe Glow Studio', rating: 4.9, specialty: 'Skin Treatments' },
  { name: 'Radiance Beauty Lounge', rating: 4.8, specialty: 'Organic Facials' },
];

export function FaceAnalysisPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    scores: Record<string, number>;
    skinType: string;
    concerns: string[];
  }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const scores = {
      acne: Math.floor(Math.random() * 40) + 20,
      pigmentation: Math.floor(Math.random() * 30) + 25,
      dryness: Math.floor(Math.random() * 35) + 30,
      oiliness: Math.floor(Math.random() * 25) + 15,
      health: Math.floor(Math.random() * 20) + 70,
    };

    setResults({
      scores,
      skinType: ['Normal', 'Dry', 'Oily', 'Combination'][Math.floor(Math.random() * 4)],
      concerns: ['Dehydration', 'Dullness', 'Large Pores', 'Uneven Tone'].slice(0, Math.floor(Math.random() * 3) + 1),
    });
    setIsAnalyzing(false);
    showToast('Face analysis complete!', 'success');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 mb-4">
              <Camera className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-300">AI Skin Analysis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Face Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload a selfie to get personalized skin analysis and recommendations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-purple-500" />
                    Face Preview
                  </h2>
                  {uploadedImage && (
                    <Button variant="ghost" size="sm" onClick={handleReset} icon={<RefreshCw className="w-4 h-4" />}>
                      Reset
                    </Button>
                  )}
                </div>

                <div
                  className={`relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-dashed transition-colors ${
                    uploadedImage
                      ? 'border-purple-300 dark:border-purple-700'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded face"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-gray-800/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 flex items-center justify-center mb-4"
                      >
                        <Upload className="w-8 h-8 text-purple-500" />
                      </motion.div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                        Upload your selfie
                      </p>
                      <p className="text-sm text-gray-400">
                        Click to browse or drag and drop
                      </p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 mx-auto rounded-full border-4 border-purple-200 border-t-purple-500 mb-4"
                        />
                        <p className="text-white font-medium">Analyzing your skin...</p>
                        <p className="text-white/70 text-sm mt-1">This may take a few seconds</p>
                      </div>
                    </div>
                  )}

                  {results && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white"
                    >
                      <Check className="w-4 h-4" />
                      Analysis Complete
                    </motion.div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {!results && (
                  <div className="mt-6 space-y-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      disabled={!uploadedImage || isAnalyzing}
                      loading={isAnalyzing}
                      onClick={handleAnalyze}
                      icon={<Sparkles className="w-4 h-4" />}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze My Skin'}
                    </Button>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Your image is processed locally and not stored
                    </p>
                  </div>
                )}

                {results && (
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="flex-1" icon={<Download className="w-4 h-4" />}>
                      Download Report
                    </Button>
                    <Button variant="ghost" className="flex-1" icon={<Share2 className="w-4 h-4" />}>
                      Share Results
                    </Button>
                  </div>
                )}
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {results ? (
                <>
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-gray-900 dark:text-white">Skin Analysis Results</h2>
                      <Badge variant="info">{results.skinType} Skin</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {skinMetrics.map((metric, i) => {
                        const score = results.scores[metric.id];
                        const Icon = metric.icon;
                        return (
                          <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {metric.label}
                              </span>
                            </div>
                            <div className="flex items-end gap-2">
                              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {score}
                              </span>
                              <span className="text-sm text-gray-500 mb-1">/100</span>
                            </div>
                            <Progress value={score} variant={score > 50 ? 'warning' : 'success'} />
                          </motion.div>
                        );
                      })}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Identified Concerns
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.concerns.map((concern, i) => (
                          <Badge key={i} variant="warning">{concern}</Badge>
                        ))}
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Treatments</h2>
                    <div className="space-y-3">
                      {recommendedTreatments.map((treatment, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{treatment.name}</p>
                            <p className="text-xs text-gray-500">{treatment.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-500">₹{treatment.price}</p>
                            <Badge variant="success" className="text-xs">{treatment.match}% Match</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Link to="/discover">
                      <Button variant="primary" className="w-full mt-4" icon={<ArrowRight className="w-4 h-4" />}>
                        Book Treatment
                      </Button>
                    </Link>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Salons</h2>
                    <div className="space-y-3">
                      {recommendedSalons.map((salon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{salon.name}</p>
                            <p className="text-xs text-gray-500">{salon.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">⭐ {salon.rating}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </>
              ) : (
                <GlassCard className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 flex items-center justify-center mb-6">
                    <Sparkles className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    AI Skin Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
                    Upload a clear selfie to receive a comprehensive skin analysis powered by advanced AI.
                    Get personalized recommendations for treatments and salons.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-left w-full max-w-sm">
                    {['Acne & Blemishes', 'Pigmentation', 'Dryness Levels', 'Skin Type'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
