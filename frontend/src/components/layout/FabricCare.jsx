import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Sun, 
  Ban, 
  Leaf, 
  Shirt, 
  Scale, 
  Layers, 
  Sparkles,
  ThermometerSun
} from 'lucide-react';

const FabricCare = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const careSteps = [
    {
      icon: Droplets,
      title: "Wash Cold",
      desc: "Wash inside out at 30°C (85°F). Cold water preserves the fiber structure and prevents shrinkage."
    },
    {
      icon: Ban,
      title: "No Bleach",
      desc: "Avoid bleach and strong chemical detergents that break down the cotton fibers over time."
    },
    {
      icon: Wind,
      title: "Line Dry",
      desc: "Air dry flat when possible. If tumbling is necessary, use the lowest heat setting."
    },
    {
      icon: ThermometerSun,
      title: "Low Iron",
      desc: "Iron inside out on low heat. Never iron directly over screen prints or embroidery."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-zinc-900/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-zinc-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 py-24 lg:py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Layers className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              FABRIC & CARE
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Technical specifications and maintenance guides to ensure your garments age gracefully.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-24"
          >
            
            {/* Left Column: The Material (Specs) */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <motion.h2 variants={itemVariants} className="text-3xl font-black mb-8 flex items-center gap-3">
                  <Shirt className="w-6 h-6 text-zinc-500" />
                  Material Specs
                </motion.h2>

                <div className="grid gap-4">
                  {/* Spec Card 1 */}
                  <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                        <Scale className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 uppercase">Weight</span>
                    </div>
                    <div className="text-3xl font-black mb-1">320<span className="text-lg text-zinc-500 font-medium ml-1">GSM</span></div>
                    <p className="text-sm text-zinc-400">Heavyweight combed cotton. Provides structure and drape that resists deformation.</p>
                  </motion.div>

                  {/* Spec Card 2 */}
                  <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 uppercase">Composition</span>
                    </div>
                    <div className="text-3xl font-black mb-1">100%<span className="text-lg text-zinc-500 font-medium ml-1">Organic</span></div>
                    <p className="text-sm text-zinc-400">Sourced from traceable suppliers. Loopback French terry used for select warmth pieces.</p>
                  </motion.div>
                </div>
              </div>

              <motion.div variants={itemVariants} className="pt-8 border-t border-zinc-800">
                <h3 className="text-xl font-bold mb-4 text-white">Why Weight Matters</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Heavier weights (300+ GSM) drape more consistently and develop a pleasing hand feel with age. Unlike lightweight cottons that twist, our fabrics are engineered to hold their silhouette.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Care Guide */}
            <div className="lg:col-span-7">
              <motion.h2 variants={itemVariants} className="text-3xl font-black mb-8 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-zinc-500" />
                Care Guide
              </motion.h2>

              {/* Care Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {careSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="group p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-black border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stain & Sustainability Section */}
              <motion.div variants={itemVariants} className="rounded-3xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Longevity & Stain Care</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-1.5 h-full min-h-[50px] bg-red-500/50 rounded-full" />
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">Spot Treatment</h4>
                        <p className="text-zinc-400 text-sm">Treat fresh stains immediately with cold water. For oil-based stains, apply gentle detergent and rub lightly before washing.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1.5 h-full min-h-[50px] bg-green-500/50 rounded-full" />
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">Sustainable Philosophy</h4>
                        <p className="text-zinc-400 text-sm">We design for longevity. Repairing, reusing, and washing less frequently extends the life of garments — the most sustainable choice.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FabricCare;