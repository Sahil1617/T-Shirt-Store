import { useState, useEffect } from 'react';
import { 
  Package, 
  Calendar, 
  MapPin, 
  Truck, 
  ArrowRight, 
  ShoppingBag,
  ChevronRight,
  CreditCard,
  Copy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/my-orders');
      // Sort orders by date (newest first) if not already
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Bespoke status styling - Minimalist dots/text
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'delivered':
        return { color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Delivered' };
      case 'shipped':
        return { color: 'bg-blue-500', text: 'text-blue-500', label: 'In Transit' };
      case 'processing':
        return { color: 'bg-zinc-500', text: 'text-zinc-400', label: 'Processing' };
      case 'cancelled':
        return { color: 'bg-red-500', text: 'text-red-500', label: 'Cancelled' };
      default:
        return { color: 'bg-zinc-500', text: 'text-zinc-500', label: status };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optional: Add toast here
  };

  const toggleDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin"></div>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Loading Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      
      {/* --- Header Section --- */}
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2">
                Orders
              </h1>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                {orders.length} Transactions Found // {user?.email}
              </p>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-sm font-bold hover:text-zinc-300 transition-colors">
              New Drop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {orders.length === 0 ? (
          // --- Empty State ---
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-3xl"
          >
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-8 w-8 text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Purchase History</h2>
            <p className="text-zinc-500 mb-8 font-mono text-sm">You haven't copped anything yet.</p>
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          // --- Orders List ---
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = getStatusConfig(order.orderStatus);
              const isExpanded = expandedOrder === order._id;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={order._id}
                  className={`group bg-zinc-950 border transition-all duration-300 rounded-2xl overflow-hidden ${
                    isExpanded ? 'border-zinc-700 ring-1 ring-zinc-700' : 'border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  {/* --- Card Header (Clickable) --- */}
                  <div 
                    onClick={() => toggleDetails(order._id)}
                    className="cursor-pointer p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between"
                  >
                    {/* Left: ID & Date */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-lg text-white tracking-tight">#{order._id.slice(-6).toUpperCase()}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(order._id); }}
                            className="text-zinc-600 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono uppercase">
                          <span>{formatDate(order.createdAt)}</span>
                          <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                          <span>{order.items.length} Item{order.items.length > 1 && 's'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status & Price */}
                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0 mt-2 md:mt-0">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`}></div>
                          <span className={`text-sm font-bold ${status.text}`}>{status.label}</span>
                       </div>
                       
                       <div className="text-right">
                          <span className="block font-mono text-xl font-bold text-white">
                            ₹{order.totalAmount?.toFixed(2)}
                          </span>
                       </div>

                       <ChevronRight className={`w-5 h-5 text-zinc-600 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* --- Expanded Details --- */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-zinc-900 bg-zinc-900/30">
                          
                          {/* Items Grid */}
                          <div className="p-6 space-y-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                                  <img 
                                    src={item.product?.image} 
                                    alt={item.product?.name}
                                    className="w-full h-full object-cover opacity-80"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-bold truncate">{item.product?.name}</h4>
                                  <p className="text-zinc-500 text-xs font-mono mt-1">
                                    SIZE: {item.size || 'N/A'} <span className="mx-2">/</span> QTY: {item.quantity}
                                  </p>
                                </div>
                                <div className="text-white font-mono text-sm">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer Info (Address & Summary) */}
                          <div className="bg-black/40 p-6 grid md:grid-cols-2 gap-8 border-t border-zinc-900">
                             
                             {/* Shipping Info */}
                             {order.shippingAddress && (
                               <div>
                                 <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Truck className="w-3 h-3" /> Shipping Details
                                 </h5>
                                 <div className="text-sm text-zinc-300 leading-relaxed">
                                   <p className="text-white font-bold mb-1">{order.shippingAddress.name}</p>
                                   <p>{order.shippingAddress.address}</p>
                                   <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                   <p className="font-mono mt-1 text-zinc-500">{order.shippingAddress.zipCode}</p>
                                   {order.shippingAddress.phone && (
                                      <p className="mt-2 text-xs text-zinc-500 flex items-center gap-1">
                                        <span className="uppercase">Contact:</span> {order.shippingAddress.phone}
                                      </p>
                                   )}
                                 </div>
                               </div>
                             )}

                             {/* Payment Summary */}
                             <div>
                                <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <CreditCard className="w-3 h-3" /> Payment Summary
                                </h5>
                                <div className="space-y-2 text-sm">
                                   <div className="flex justify-between text-zinc-400">
                                      <span>Subtotal</span>
                                      <span className="font-mono">₹{(order.totalAmount / 1.08).toFixed(2)}</span>
                                   </div>
                                   <div className="flex justify-between text-zinc-400">
                                      <span>Tax (8%)</span>
                                      <span className="font-mono">₹{(order.totalAmount - (order.totalAmount / 1.08)).toFixed(2)}</span>
                                   </div>
                                   <div className="flex justify-between text-zinc-400">
                                      <span>Shipping</span>
                                      <span className="text-white text-xs uppercase font-bold">Free</span>
                                   </div>
                                   <div className="border-t border-dashed border-zinc-800 pt-2 mt-2 flex justify-between items-center">
                                      <span className="font-bold text-white">Total Paid</span>
                                      <span className="font-mono text-lg text-white font-bold">₹{order.totalAmount.toFixed(2)}</span>
                                   </div>
                                </div>
                             </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;