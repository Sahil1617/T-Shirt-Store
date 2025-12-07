import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Globe, 
  RotateCcw, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const ShippingReturns = () => {
  // Animation Stagger
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

  const returnSteps = [
    {
      step: "01",
      title: "Request Return",
      desc: "Log into your account or contact support to generate a return reference number."
    },
    {
      step: "02",
      title: "Pack Securely",
      desc: "Place items (unworn, with tags) in original packaging. Include the order slip."
    },
    {
      step: "03",
      title: "Ship & Refund",
      desc: "Send via tracked mail. Refund processed to original payment within 7 days of receipt."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-zinc-900/30 blur-[120px] rounded-full" />
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
              <Truck className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              SHIPPING & RETURNS
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about getting your gear and what to do if it doesn't fit perfectly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Policy Highlights */}
      <div className="relative z-10 border-b border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-bold uppercase tracking-wider text-zinc-400">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              1-2 Day Processing
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white" />
              Free Ship &gt; ₹499
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-white" />
              30-Day Returns
            </span>
          </div>
        </div>
      </div>

      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-24"
          >
            
            {/* SECTION 1: SHIPPING */}
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-zinc-800"></div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">Shipping Information</h2>
                <div className="h-px flex-1 bg-zinc-800"></div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Domestic Card */}
                <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-zinc-800 rounded-lg">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Domestic Shipping</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-zinc-500 font-mono uppercase mb-1">Timeline</div>
                        <div className="text-2xl font-bold text-white">3 — 7 Business Days</div>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500 font-mono uppercase mb-1">Standard Cost</div>
                        <div className="text-white">Free on orders over ₹499</div>
                      </div>
                      <div className="pt-4 border-t border-zinc-800">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Orders placed before 2PM IST are typically processed the same day. Tracking details are emailed upon dispatch.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* International Card */}
                <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-32 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-zinc-800 rounded-lg">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">International</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-zinc-500 font-mono uppercase mb-1">Timeline</div>
                        <div className="text-2xl font-bold text-white">7 — 21 Business Days</div>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500 font-mono uppercase mb-1">Cost</div>
                        <div className="text-white">Calculated at checkout</div>
                      </div>
                      <div className="pt-4 border-t border-zinc-800">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-zinc-500 shrink-0" />
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            <span className="text-white font-bold">Customs Notice:</span> Import duties and taxes may apply upon arrival in your country. These fees are the responsibility of the recipient.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* SECTION 2: RETURNS */}
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-zinc-800"></div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">Returns & Refunds</h2>
                <div className="h-px flex-1 bg-zinc-800"></div>
              </motion.div>

              <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 md:p-12">
                <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
                  <p className="text-lg text-zinc-300">
                    We accept returns within <span className="text-white font-bold border-b border-white">30 days</span> of delivery. 
                    Items must be unworn, unwashed, and have original tags attached.
                  </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-zinc-800 z-0"></div>

                  {returnSteps.map((step, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="relative z-10 flex flex-col items-center text-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-black border-4 border-zinc-800 flex flex-col items-center justify-center mb-6 shadow-xl">
                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Step</span>
                        <span className="text-2xl font-black text-white">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Refund Note */}
                <motion.div 
                  variants={itemVariants} 
                  className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-center gap-4 text-center"
                >
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Refunds issued to original payment method</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 bg-zinc-800 rounded-full"></div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Shipping costs non-refundable (unless our error)</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ShippingReturns;