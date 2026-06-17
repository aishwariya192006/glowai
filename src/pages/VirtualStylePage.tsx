import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Scissors,
  Sparkles,
  Check,
  RefreshCw,
  Download,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress } from '../components/ui';
import { useToast } from '../context/ToastContext';

const hairStyles = [
  {
    id: 'layer',
    name: 'Layer Cut',
    description: 'Layers add movement and volume',
    image: '/images/layer-cut.jpeg',
    duration: '30-45 mins',
    match: 95,
  },
  {
    id: 'bob',
    name: 'Bob Cut',
    description: 'Classic chic, easy maintenance',
    image: '/images/bob-haircut.jpg',
    duration: '25-35 mins',
    match: 88,
  },
  {
    id: 'wedding',
    name: 'Wedding Style',
    description: 'Elegant traditional bridal style',
    image: 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg',
    duration: '60-90 mins',
    match: 92,
  },
  {
    id: 'curly',
    name: 'Curly Style',
    description: 'Enhance natural curls',
    image: 'https://images.pexels.com/photos/1564076/pexels-photo-1564076.jpeg',
    duration: '45-60 mins',
    match: 85,
  },
  {
    id: 'straight',
    name: 'Straight Style',
    description: 'Sleek and modern look',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    duration: '30-45 mins',
    match: 90,
  },
  {
    id: 'messy',
    name: 'Messy Bun',
    description: 'Casual chic everyday style',
    image: 'https://images.pexels.com/photos/3758036/pexels-photo-3758036.jpeg',
    duration: '15-20 mins',
    match: 78,
  },
];

export function VirtualStylePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [result, setResult] = useState<null | {
    style: typeof hairStyles[0];
    match: number;
    beforeImage: string;
    afterImage: string;
  }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setResult(null);
        setSelectedStyle(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyStyle = async (styleId: string) => {
    if (!uploadedImage) return;

    setSelectedStyle(styleId);
    setIsApplying(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const selectedStyleData = hairStyles.find((s) => s.id === styleId)!;
    setResult({
      style: selectedStyleData,
      match: selectedStyleData.match,
      beforeImage: uploadedImage,
      afterImage: selectedStyleData.image,
    });
    setIsApplying(false);
    showToast('Style applied successfully!', 'success');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 mb-4">
              <Scissors className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Virtual Try-On</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Virtual Hairstyle Studio
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload your photo and try different hairstyles before your next salon visit
            </p>
          </motion.div>

          {!result ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Camera className="w-5 h-5 text-purple-500" />
                      Your Photo
                    </h2>
                    {uploadedImage && (
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        Reset
                      </Button>
                    )}
                  </div>

                  <div
                    className={`relative aspect-square rounded-3xl overflow-hidden border-2 border-dashed transition-colors ${
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
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 flex items-center justify-center mb-4"
                        >
                          <Upload className="w-10 h-10 text-purple-500" />
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                          Upload your photo
                        </p>
                        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    )}

                    {isApplying && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 mx-auto rounded-full border-4 border-purple-200 border-t-purple-500 mb-4"
                          />
                          <p className="text-white font-medium">Applying style...</p>
                          <p className="text-white/70 text-sm mt-1">AI is working its magic</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {!uploadedImage && (
                    <div className="mt-4 text-center">
                      <Button
                        variant="primary"
                        onClick={() => fileInputRef.current?.click()}
                        icon={<Upload className="w-4 h-4" />}
                      >
                        Upload Photo
                      </Button>
                    </div>
                  )}

                  {uploadedImage && !isApplying && (
                    <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                      Your image is not stored and processed locally
                    </p>
                  )}
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Select Hairstyle
                  </h2>

                  <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {hairStyles.map((style, i) => (
                      <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => uploadedImage && handleApplyStyle(style.id)}
                        disabled={!uploadedImage || isApplying}
                        className={`relative p-3 rounded-2xl overflow-hidden border-2 transition-all ${
                          selectedStyle === style.id
                            ? 'border-purple-500 ring-2 ring-purple-500/20'
                            : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                        } ${!uploadedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2">
                          <img
                            src={style.image}
                            alt={style.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm text-left">
                          {style.name}
                        </h3>
                        <p className="text-xs text-gray-500 text-left">{style.duration}</p>
                        {selectedStyle === style.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {!uploadedImage && (
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Upload a photo to select a hairstyle
                    </p>
                  )}
                </GlassCard>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Style Preview
                  </h2>
                  <Button variant="ghost" size="sm" onClick={handleReset} icon={<RefreshCw className="w-4 h-4" />}>
                    Try Another Style
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 mb-2">Before</p>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                      <img src={result.beforeImage} alt="Before" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <span className="text-white font-bold text-xs px-3 py-1 rounded-full bg-black/50">Original</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">After</p>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-purple-300 dark:border-purple-700">
                      <img src={result.afterImage} alt="After" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10">
                        <span className="text-white font-bold text-xs px-3 py-1 rounded-full bg-purple-500">{result.style.name}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Badge variant="success" className="text-sm">{result.match}% Match</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{result.style.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.style.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⏱️ {result.style.duration}</span>
                    <span>✨ {result.match}% AI Match</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1" icon={<Download className="w-4 h-4" />}>
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1" icon={<Share2 className="w-4 h-4" />}>
                    Share
                  </Button>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Ready to try this style?
                </h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Luxe Glow Studio</p>
                    <p className="text-sm text-gray-500">T. Nagar • ⭐ 4.9</p>
                  </div>
                  <Button variant="primary" className="flex items-center gap-2">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 mt-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Style Sanctuary</p>
                    <p className="text-sm text-gray-500">Anna Nagar • ⭐ 4.7</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
