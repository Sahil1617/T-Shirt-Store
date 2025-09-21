import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-purple-900 to-pink-900 text-white py-32 h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/hero.mp4"
        />

        {/* Overlay to Darken Video for Better Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Premium Quality T-Shirts
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover our collection of comfortable and stylish t-shirts for
            every occasion.
          </p>

          <CurvedLoop
            marqueeText="✦ Premium T-Shirts With Comfort & Style For Every Occasion"
            speed={3}
            curveAmount={1}
            direction="right"
            interactive={true}
            className="custom-text-style text-white"
          />

          <Link
            to="/products"
            className="mt-8 inline-block px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Shop Now <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature: Fast Shipping */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Fast Shipping</h3>
              <p className="text-gray-600">
                Get your orders delivered quickly with our reliable shipping
                partners.
              </p>
            </div>

            {/* Feature: Secure Payment */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Your payment information is always protected with our secure
                system.
              </p>
            </div>

            {/* Feature: Premium Quality */}
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Made from high-quality materials for maximum comfort and
                durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-2">
              Discover our most popular T-Shirts
            </p>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block w-48 h-14 flex items-center justify-center text-white text-lg font-semibold rounded-full shadow-lg 
               bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 
               transition-all duration-300 transform hover:scale-105 px-4 py-3"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary-600 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4 animate-fade-in">
            Stay Updated
          </h2>

          <p className="text-lg text-primary-100 mb-10 animate-slide-up">
            Subscribe to our newsletter for exclusive offers, updates, and new
            arrivals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
            />

            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
