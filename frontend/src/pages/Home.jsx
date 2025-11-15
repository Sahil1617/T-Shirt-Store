import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ProductGrid from "../components/products/ProductGrid";
import api from "../config/axios";
import CurvedLoop from "./CurvedLoop";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get("/api/products?limit=4");
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-purple-900 to-pink-900 text-white py-32 h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/hero.mp4"
        />

        {/* Enhanced Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 animate-fade-in">
            <SparklesIcon className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">New Collection 2025</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight">
            Premium Quality T-Shirts
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-slide-up text-gray-100 font-light">
            Discover our collection of comfortable and stylish t-shirts for
            every occasion.
          </p>

          <CurvedLoop
            marqueeText="✦ Premium T-Shirts With Comfort & Style For Every Occasion"
            speed={3}
            curveAmount={1}
            direction="right"
            interactive={true}
            className="custom-text-style text-white mb-8"
          />

          <Link
            to="/products"
            className="group mt-4 inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-white hover:to-gray-100"
          >
            Shop Now 
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">Experience the difference with our exceptional service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature: Fast Shipping */}
            <div className="group relative text-center p-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <TruckIcon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your orders delivered quickly with our reliable shipping
                partners.
              </p>
            </div>

            {/* Feature: Secure Payment */}
            <div className="group relative text-center p-10 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <ShieldCheckIcon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">
                Your payment information is always protected with our secure
                system.
              </p>
            </div>

            {/* Feature: Premium Quality */}
            <div className="group relative text-center p-10 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <StarIcon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Made from high-quality materials for maximum comfort and
                durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              TRENDING NOW
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most popular T-Shirts crafted with care and style
            </p>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-white text-lg font-bold rounded-full shadow-xl 
               bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
               hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 
               transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative">View All Products</span>
              <ArrowRightIcon className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            ✉️ NEWSLETTER
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 animate-fade-in">
            Stay Updated
          </h2>

          <p className="text-xl text-white/90 mb-10 animate-slide-up max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, updates, and new
            arrivals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white/70 font-medium transition-all duration-300"
            />

            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gray-50">
              Subscribe
            </button>
          </div>

          <p className="mt-6 text-sm text-white/70">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;