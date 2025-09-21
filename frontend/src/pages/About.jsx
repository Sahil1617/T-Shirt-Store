import React from "react";
import { ShirtIcon, LeafIcon, HeartIcon, TruckIcon } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About TShirtStore</h1>
          <p className="text-lg text-gray-300">
            Premium quality. Timeless style. Comfort you can feel.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/images/hero.jpg"
            alt="Our Story"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              TShirtStore was born from a simple idea – to create premium quality t-shirts
              that combine comfort, durability, and effortless style.  
              What started as a small passion project has grown into a
              trusted brand for people who value both fashion and sustainability.
            </p>
            <p className="text-gray-600">
              Every piece we create reflects our commitment to superior fabrics,
              modern designs, and ethical production.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">What We Stand For</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <ShirtIcon className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                We use only the finest cotton blends to ensure unmatched softness and fit.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <LeafIcon className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Eco-friendly production and packaging to protect our planet.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <HeartIcon className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm">
                Your satisfaction drives everything we do, from design to delivery.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <TruckIcon className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick, reliable shipping to get your favorite tees to your door faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-gray-300 mb-8">
            Whether you're a trendsetter, a minimalist, or a casual wearer,
            TShirtStore is here to bring comfort and confidence to your everyday style.
          </p>
          <a
            href="/products"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
