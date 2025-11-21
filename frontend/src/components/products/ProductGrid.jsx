import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';
import ProductCard from './ProductCard';

// --- Animation Variants ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

// --- Skeleton Loader Component ---
const SkeletonCard = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl animate-pulse">
        <div className="w-32 h-32 bg-zinc-800 rounded-xl flex-shrink-0" />
        <div className="flex-1 py-2 space-y-3">
          <div className="h-6 bg-zinc-800 rounded w-1/3" />
          <div className="h-4 bg-zinc-800 rounded w-1/4" />
          <div className="h-4 bg-zinc-800 rounded w-1/2" />
          <div className="h-10 bg-zinc-800 rounded w-24 mt-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[4/5] w-full bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-zinc-800 rounded w-1/3" />
          <div className="h-8 bg-zinc-800 rounded w-8" />
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, loading, viewMode = 'grid' }) => {
  // --- Loading State ---
  if (loading) {
    return (
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // --- Empty State ---
  if (!products || products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center bg-zinc-900/30 border border-white/5 rounded-3xl"
      >
        <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
          <PackageSearch className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
        <p className="text-gray-400 max-w-md">
          We couldn't find what you're looking for. Try adjusting your filters or search query.
        </p>
      </motion.div>
    );
  }

  // --- Main Content ---
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }
    >
      {products.map(product => (
        <motion.div key={product._id} variants={item} layout>
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;