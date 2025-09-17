import { Link } from 'react-router-dom';
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                TS
              </div>
              <span className="ml-2 font-bold text-xl">TShirtStore</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium quality t-shirts for every occasion. Comfort, style, and sustainability in every thread.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Men's T-Shirts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Women's T-Shirts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Graphic Tees
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Plain Tees
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Premium Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-gray-400">123 Fashion Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-gray-400">support@tshirtstore.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Subscribe to Newsletter</h4>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
              <TruckIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-gray-400 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <CreditCardIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-gray-400 text-sm">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h4 className="font-semibold">Quality Guarantee</h4>
                <p className="text-gray-400 text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm ">
              © 2025 TShirtStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;