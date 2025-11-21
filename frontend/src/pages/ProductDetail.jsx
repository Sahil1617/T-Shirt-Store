import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon
} from "lucide-react";
import { useCart } from "../context/CartContext";
import api from "../config/axios";
import ProductCard from "../components/products/ProductCard"; // Reusing your styled card

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll on load
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSize(product.sizes[0]);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get(`/api/products?limit=4`);
      setRelatedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
  };

  const incrementQty = () => setQuantity(prev => Math.min(prev + 1, product.stock || 10));
  const decrementQty = () => setQuantity(prev => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-purple-400 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  // Simulating multiple images if only 1 exists
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image, product.image]; 

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="space-y-6 sticky top-32 self-start">
            <div className="relative aspect-[4/5] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-purple-900/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute top-4 right-4">
                <button className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-purple-600 transition-colors group">
                  <HeartIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-purple-500 opacity-100 ring-2 ring-purple-500/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="flex flex-col">
            <div className="mb-2">
               <span className="text-purple-400 font-bold tracking-widest text-xs uppercase">New Drop</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{product.name}</h1>

            {/* Rating & Price */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-gray-500 ml-1">(128 reviews)</span>
              </div>
            </div>

            <div className="mb-8 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-white">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-600 line-through decoration-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 border-b border-white/10 pb-10">
              {product.description}
            </p>

            {/* SIZES */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Select Size</span>
                  <button className="text-xs text-purple-400 underline hover:text-purple-300">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[3rem] h-12 flex items-center justify-center rounded-xl border transition-all font-medium ${
                        size === s
                          ? "bg-white text-black border-white"
                          : "bg-zinc-900 text-gray-400 border-zinc-700 hover:border-gray-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ADD TO CART */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-700 w-fit">
                <button onClick={decrementQty} className="p-4 hover:text-white text-gray-500 transition-colors">
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button onClick={incrementQty} className="p-4 hover:text-white text-gray-500 transition-colors">
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Add Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-purple-900/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-900/50 transition-shadow"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {product.stock ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              {/* Share */}
              <button className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl hover:bg-zinc-800 hover:text-white text-gray-400 transition-colors">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <TruckIcon className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On all orders over ₹499</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">Secure Payment</h4>
                  <p className="text-xs text-gray-500">100% protected checkout</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- RELATED PRODUCTS SECTION --- */}
        <div className="mt-32 border-t border-white/10 pt-20">
          <h2 className="text-3xl font-bold mb-10 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.filter(p => p._id !== id).map((relatedProduct) => (
               <ProductCard key={relatedProduct._id} product={relatedProduct} viewMode="grid" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;