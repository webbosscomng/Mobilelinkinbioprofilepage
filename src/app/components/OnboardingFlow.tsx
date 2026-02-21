import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Store, Link, CheckCircle, ChevronRight, ChevronLeft, MapPin, User, ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useWebBoss } from "../context/WebBossContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function OnboardingFlow() {
  const { profile, updateProfile, completeOnboarding } = useWebBoss();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
        {/* Left Side: Illustration/Image */}
        <div className="w-full md:w-1/2 bg-slate-900 relative hidden md:block">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="img-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1657449018188-00a58de3cb21?q=80&w=1080"
                  alt="Welcome to Web Boss"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white max-w-xs">
                  <h2 className="text-3xl font-bold mb-2">Build your empire from Lagos to the world.</h2>
                  <p className="text-slate-300">Web Boss helps Nigerian SMEs grow their digital presence effortlessly.</p>
                </div>
              </motion.div>
            )}
            {(step === 2 || step === 3) && (
              <motion.div
                key="img-2-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1680345575812-2f6878d7d775?q=80&w=1080"
                  alt="Store Catalog"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white max-w-xs">
                  <h2 className="text-3xl font-bold mb-2">Your products, your way.</h2>
                  <p className="text-slate-300">Set up your catalog, manage stock, and receive orders directly on WhatsApp.</p>
                </div>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="img-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1688302529084-767fbc296565?q=80&w=1080"
                  alt="Success"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white max-w-xs">
                  <h2 className="text-3xl font-bold mb-2">You're ready to Boss Up!</h2>
                  <p className="text-slate-300">Start sharing your link and watch your business grow.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Flow Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col relative">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-green-600' : 'bg-slate-100'}`}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Step 1: Welcome</span>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome to Web Boss</h1>
                    <p className="text-slate-500 mt-2 text-lg">Let's get your business profile set up in less than 2 minutes.</p>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-green-600" />
                        Business Name
                      </label>
                      <Input 
                        placeholder="e.g. Chioma's Fashion Hub" 
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <MapPin size={16} className="text-green-600" />
                        Location
                      </label>
                      <Input 
                        placeholder="e.g. Lagos, Nigeria" 
                        value={profile.location}
                        onChange={(e) => updateProfile({ location: e.target.value })}
                        className="h-12 text-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Step 2: Profile</span>
                    <h1 className="text-3xl font-bold text-slate-900">Tell us your story</h1>
                    <p className="text-slate-500 mt-2 text-lg">Your bio appears at the top of your page. Keep it short and sweet.</p>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-semibold text-slate-700">Business Bio</label>
                      <textarea 
                        className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                        placeholder="e.g. Premium African fashion & accessories. Custom orders available. Same-day delivery in Lagos."
                        value={profile.bio}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Step 3: Core Features</span>
                    <h1 className="text-3xl font-bold text-slate-900">Powerful Tools</h1>
                    <p className="text-slate-500 mt-2 text-lg">You have everything you need to succeed built right in.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <Link size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Link-in-Bio</h3>
                        <p className="text-sm text-slate-500">Collect all your social links and website in one beautiful page.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Store size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Mini-Store</h3>
                        <p className="text-sm text-slate-500">List your products and take orders directly on WhatsApp.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        <Rocket size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Inventory Tracker</h3>
                        <p className="text-sm text-slate-500">Manage stock and auto-hide out-of-stock items.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900">You're all set!</h1>
                  <p className="text-slate-500 text-lg max-w-sm mx-auto">
                    Welcome to the community of Web Bosses. Your digital home is ready for the world.
                  </p>
                  <div className="pt-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 max-w-sm mx-auto">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Link</p>
                      <p className="text-lg font-bold text-green-600 truncate">webboss.ng/{profile.name.toLowerCase().replace(/\s+/g, '-')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 && step < 4 ? (
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <Button 
              onClick={handleNext}
              className={`h-12 px-8 rounded-xl font-bold text-lg gap-2 ${step === 4 ? 'bg-green-600 hover:bg-green-700 w-full md:w-auto' : 'bg-slate-900 hover:bg-slate-800'}`}
            >
              {step === 4 ? 'Go to Dashboard' : 'Continue'}
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
