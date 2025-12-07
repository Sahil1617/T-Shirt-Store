import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ArrowLeftRight, ArrowUpDown, Shirt, Info, CheckCircle2 } from 'lucide-react';

const Sizeguide = () => {
  const [unit, setUnit] = useState('in');

  // Helper to convert measurements
  const getValue = (val) => {
    return unit === 'in' ? val : Math.round(val * 2.54);
  };

  const sizes = [
    { label: 'S', chest: 36, length: 27, sleeve: 8.5 },
    { label: 'M', chest: 40, length: 28, sleeve: 9 },
    { label: 'L', chest: 44, length: 29, sleeve: 9.5 },
    { label: 'XL', chest: 48, length: 30, sleeve: 10 },
    { label: 'XXL', chest: 52, length: 31, sleeve: 10.5 },
  ];

  const guideSteps = [
    {
      icon: ArrowLeftRight,
      title: "Chest",
      desc: "Measure across the fullest part of the chest, under the armpits, keeping the tape horizontal."
    },
    {
      icon: ArrowUpDown,
      title: "Length",
      desc: "Measure from the highest point of the shoulder (beside the collar) down to the bottom hem."
    },
    {
      icon: Ruler,
      title: "Sleeve",
      desc: "Measure from the shoulder seam down to the end of the sleeve opening."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-900/40 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              SIZE GUIDE
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Find your perfect fit. Detailed measurements and advice to ensure you get exactly what you expect.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Fit Notes & Visualizer */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shirt className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold">Fit Profile</h2>
                </div>

                {/* Fit Slider */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <span>Slim</span>
                    <span className="text-white">Boxy</span>
                    <span>Oversized</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-2/3 bg-gradient-to-r from-zinc-600 to-white rounded-full" />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                    Our cuts are designed with a slightly dropped shoulder and a boxy torso. 
                  </p>
                </div>

                <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-400">
                      <strong className="text-white block mb-1">Model Reference</strong>
                      Height: 6'0" (183cm)<br/>
                      Weight: 175lbs<br/>
                      Wears: Size <span className="text-white font-bold">Medium</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Tips */}
              <div className="space-y-4">
                <h3 className="font-bold text-white pl-2">Quick Tips</h3>
                <ul className="space-y-3">
                  {[
                    "Size down for a standard/slim fit",
                    "Wash cold, hang dry to maintain size",
                    "Measurements are taken flat"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-zinc-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Table */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Table Header & Toggle */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Measurements</h2>
                  
                  <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                    <button 
                      onClick={() => setUnit('in')}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${unit === 'in' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                    >
                      INCHES
                    </button>
                    <button 
                      onClick={() => setUnit('cm')}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${unit === 'cm' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                    >
                      CM
                    </button>
                  </div>
                </div>

                {/* The Table */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-900/50 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                        <th className="p-5">Size</th>
                        <th className="p-5">Chest Width</th>
                        <th className="p-5">Body Length</th>
                        <th className="p-5">Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      <AnimatePresence mode='wait'>
                        {sizes.map((row, index) => (
                          <motion.tr 
                            key={row.label}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-zinc-900/60 transition-colors group"
                          >
                            <td className="p-5 font-bold text-white group-hover:text-zinc-200">{row.label}</td>
                            <td className="p-5 font-mono text-zinc-300 group-hover:text-white">{getValue(row.chest)} {unit}</td>
                            <td className="p-5 font-mono text-zinc-300 group-hover:text-white">{getValue(row.length)} {unit}</td>
                            <td className="p-5 font-mono text-zinc-300 group-hover:text-white">{getValue(row.sleeve)} {unit}</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-xs text-zinc-500 text-right">
                  * Tolerance +/- 0.5 inches due to garment dyeing process.
                </p>
              </motion.div>

              {/* How to Measure Cards */}
              <div className="mt-16">
                <h3 className="text-xl font-bold mb-8">How to Measure</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {guideSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.div 
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                          <Icon className="w-5 h-5 text-zinc-400" />
                        </div>
                        <h4 className="font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sizeguide;