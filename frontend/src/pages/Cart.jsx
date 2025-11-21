import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { items, updateCartItem, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full border border-white/10 p-12 bg-zinc-950"
        >
          <div className="w-16 h-16 border border-zinc-800 bg-black flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-6 w-6 text-zinc-500" />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Bag Empty
          </h2>
          <p className="text-zinc-500 font-mono text-xs mb-10 uppercase tracking-wide">
            Inventory Status: 0 Items
          </p>
          <Link
            to="/products"
            className="block w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-zinc-200 transition-colors"
          >
            Browse Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-20">
      {/* Page Header */}
      <div className="border-b border-white/10 bg-black pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                 /// Checkout Process
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
                 Shopping<br/>Bag
              </h1>
           </div>
           <div className="text-right">
              <p className="text-xl font-bold text-white">{items.length} Items</p>
              <button 
                 onClick={clearCart}
                 className="text-xs font-mono text-red-500 hover:text-red-400 uppercase tracking-wider mt-2 underline decoration-1 underline-offset-4"
              >
                 Clear All
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* --- LEFT: CART ITEMS (Span 8) --- */}
          <div className="lg:col-span-8">
             
             {/* Table Header (Desktop) */}
             <div className="hidden md:grid grid-cols-12 gap-4 border-b border-white/10 pb-4 mb-4 text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
             </div>

            <div className="space-y-0">
              <AnimatePresence mode='popLayout'>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product._id}-${item.size}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 py-8 border-b border-white/10"
                  >
                    {/* Product Info (Span 6) */}
                    <div className="col-span-1 md:col-span-6 flex gap-6">
                      <Link to={`/product/${item.product._id}`} className="block w-24 h-32 bg-zinc-900 flex-shrink-0 border border-white/10 hover:border-white transition-colors">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-all duration-500"
                        />
                      </Link>
                      <div className="flex flex-col justify-between py-1">
                         <div>
                            <h3 className="text-lg font-bold uppercase leading-tight mb-1 group-hover:underline decoration-1 underline-offset-4">
                               <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                            </h3>
                            <p className="text-xs font-mono text-zinc-500 uppercase">
                               Ref: {item.product._id.slice(-6)}
                            </p>
                            <div className="mt-2 inline-block px-2 py-1 border border-zinc-800 text-[10px] font-bold uppercase text-zinc-300">
                               Size: {item.size}
                            </div>
                         </div>
                         <button
                            onClick={() => removeFromCart(item.product._id, item.size)}
                            className="text-[10px] font-bold uppercase text-zinc-500 hover:text-white text-left flex items-center gap-1"
                         >
                            <X className="w-3 h-3" /> Remove
                         </button>
                      </div>
                    </div>

                    {/* Quantity (Span 2) */}
                    <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                       <div className="flex items-center border border-zinc-800">
                          <button
                             onClick={() => updateCartItem(item.product._id, Math.max(1, item.quantity - 1), item.size)}
                             className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                          >
                             <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-mono font-bold border-x border-zinc-800 h-8 flex items-center justify-center">
                             {item.quantity}
                          </span>
                          <button
                             onClick={() => updateCartItem(item.product._id, item.quantity + 1, item.size)}
                             className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                          >
                             <Plus className="w-3 h-3" />
                          </button>
                       </div>
                    </div>

                    {/* Unit Price (Span 2) */}
                    <div className="hidden md:flex col-span-2 items-center justify-end font-mono text-sm text-zinc-400">
                       ₹{item.product.price.toFixed(2)}
                    </div>

                    {/* Total Price (Span 2) */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end font-mono text-sm font-bold text-white">
                       <span className="md:hidden text-zinc-500 uppercase text-xs font-sans">Subtotal</span>
                       ₹{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-12">
               <Link to="/products" className="text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
               </Link>
            </div>
          </div>

          {/* --- RIGHT: SUMMARY (Span 4) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 border border-white/10 bg-zinc-950 p-8">
               <h2 className="text-2xl font-black uppercase mb-8">Summary</h2>
               
               <div className="space-y-4 border-b border-white/10 pb-8 mb-8">
                  <div className="flex justify-between items-center text-sm uppercase tracking-wide">
                     <span className="text-zinc-500">Subtotal</span>
                     <span className="font-mono">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm uppercase tracking-wide">
                     <span className="text-zinc-500">Shipping</span>
                     <span className="font-mono">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between items-center text-sm uppercase tracking-wide">
                     <span className="text-zinc-500">Tax (8%)</span>
                     <span className="font-mono">₹{tax.toFixed(2)}</span>
                  </div>
               </div>

               <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold uppercase">Total</span>
                  <span className="text-3xl font-mono font-bold">₹{total.toFixed(2)}</span>
               </div>

               {user ? (
                 <Link
                   to="/checkout"
                   className="group w-full bg-white text-black py-5 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                 >
                   Secure Checkout <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 </Link>
               ) : (
                 <div className="space-y-4">
                    <Link
                     to="/login"
                     className="w-full block text-center border border-white text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                   >
                     Login to Checkout
                   </Link>
                   <p className="text-[10px] text-center text-zinc-500 uppercase tracking-wide">
                     Guest checkout not available for high-value items.
                   </p>
                 </div>
               )}

               {/* Trust Footer */}
               <div className="mt-8 flex justify-center gap-6 text-zinc-600">
                  <ShieldCheck className="w-5 h-5" />
                  <CreditCard className="w-5 h-5" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;