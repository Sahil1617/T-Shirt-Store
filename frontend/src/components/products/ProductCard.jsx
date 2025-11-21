import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  ArrowUpRightIcon
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // --- LIST VIEW (Technical Row Style) ---
  if (viewMode === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="group flex flex-col sm:flex-row border-b border-white/10 bg-black hover:bg-zinc-900/50 transition-colors duration-300"
      >
        {/* Image Column */}
        <div className="w-full sm:w-40 aspect-square relative overflow-hidden border-r border-white/10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Details Column */}
        <div className="flex-1 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Ref: {product._id.slice(-6)}
                 </span>
                 {/* Optional Badge */}
                 <span className="px-1.5 py-0.5 border border-zinc-700 text-[10px] font-bold uppercase text-zinc-400">
                    In Stock
                 </span>
              </div>
              <Link to={`/product/${product._id}`} className="block">
                 <h3 className="text-2xl font-black uppercase text-white mb-1 leading-none group-hover:text-zinc-300 transition-colors">
                    {product.name}
                 </h3>
              </Link>
              <p className="text-zinc-500 text-xs max-w-md line-clamp-1 font-mono">
                 {product.description}
              </p>
           </div>

           {/* Price & Action */}
           <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-mono text-lg font-bold text-white">
                 ₹{product.price.toFixed(2)}
              </span>
              
              <button
                 onClick={handleAddToCart}
                 className="h-10 w-10 flex items-center justify-center border border-white text-white hover:bg-white hover:text-black transition-all active:scale-95"
                 aria-label="Add to Cart"
              >
                 <PlusIcon className="w-5 h-5" />
              </button>
           </div>
        </div>
      </motion.div>
    );
  }

  // --- GRID VIEW (Poster Style) ---
  return (
    <motion.div 
      className="group relative bg-black flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Area */}
      <Link to={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 border border-transparent group-hover:border-white/20 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute bottom-0 left-0 w-full bg-white text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
           <button 
             onClick={handleAddToCart}
             className="w-full py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
           >
             Add to Cart <PlusIcon className="w-3 h-3" />
           </button>
        </div>

        {/* Top Right Icon */}
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <ArrowUpRightIcon className="w-6 h-6 text-white drop-shadow-md" />
        </div>
      </Link>
      
      {/* Meta Info */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
           <Link to={`/product/${product._id}`}>
             <h3 className="text-sm font-bold uppercase text-white leading-tight group-hover:underline decoration-1 underline-offset-4">
               {product.name}
             </h3>
           </Link>
           <span className="text-sm font-mono font-medium text-zinc-400">
             ₹{product.price}
           </span>
        </div>
        
        <div className="flex justify-between items-end mt-1">
           <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
              {product.category || 'Apparel'}
           </p>
           
           {/* Mobile Add Button (Visible only on touch if needed, or keep unified) */}
           <button 
             onClick={handleAddToCart}
             className="lg:hidden text-[10px] font-bold uppercase border border-zinc-700 px-2 py-1 text-zinc-400"
           >
             Add +
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;