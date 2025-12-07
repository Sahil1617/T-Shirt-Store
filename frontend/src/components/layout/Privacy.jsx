import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Lock, Eye, Users, Mail, Globe, FileText, CheckCircle2 } from 'lucide-react';

const Privacy = () => {
  // Data structure for clean mapping
  const policySections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect only the minimum information necessary to process your orders efficiently. This includes your name, email, shipping address, and order history.",
      tags: ["Name", "Email", "Shipping Info", "Order History"]
    },
    {
      icon: Lock,
      title: "Payment Security",
      content: "We do not store your financial data. All payment transactions are processed securely through our encrypted third-party payment providers (Stripe/PayPal).",
      tags: ["SSL Encrypted", "No Stored Cards", "PCI Compliant"]
    },
    {
      icon: Eye,
      title: "How We Use Data",
      content: "Your data is used strictly to fulfill orders, send shipping updates, and improve your shopping experience. We may use anonymized analytics to optimize site performance.",
      tags: ["Order Fulfillment", "Updates", "Experience"]
    },
    {
      icon: Users,
      title: "Third Parties",
      content: "We partner with trusted services for shipping and payments only. We adhere to strict data sharing agreements and never sell your personal data to advertisers.",
      tags: ["Shipping Partners", "Payment Processors"]
    }
  ];

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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-zinc-900/40 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-zinc-900/30 blur-[100px] rounded-full opacity-30" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <div className="text-5xl md:text-7xl h-24 font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
              Privacy Policy
            </div>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Transparency is core to our brand. Here is a breakdown of how we handle, protect, and use your data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats / Trust Indicators */}
      <div className="relative z-10 border-b border-zinc-900 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Data Encryption", value: "256-bit" },
              { label: "Data Sharing", value: "Minimal" },
              { label: "Tracking", value: "Opt-in" },
              { label: "User Control", value: "100%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {policySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group relative p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-zinc-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">{section.title}</h2>
                      <div className="h-0.5 w-10 bg-zinc-800 group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {section.content}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {section.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-[10px] uppercase tracking-wider font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Cookie Policy Snippet */}
      <section className="relative z-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex items-start gap-4">
            <Globe className="w-6 h-6 text-zinc-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cookie Policy</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience. You can manage these settings in your browser at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;