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
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
                TS
              </div>
              <span className="ml-3 font-bold text-xl">TShirtStore</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium quality t-shirts for every occasion. Comfort, style, and sustainability in every thread.
            </p>
            <div className="flex space-x-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, idx) => (
                <a 
                  href="#"
                  key={idx}
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['/products', '/about', '/contact'].map((path, idx) => (
                <li key={idx}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-white transition-colors hover:underline"
                  >
                    {path === '/products' ? 'All Products' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Men's T-Shirts","Women's T-Shirts","Graphic Tees","Plain Tees","Premium Collection"].map((cat, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {[
                { icon: MapPinIcon, text: 'Pune, Maharashtra' },
                { icon: PhoneIcon, text: '+91 1234 5678' },
                { icon: MailIcon, text: 'sahiljadhav1617@gmail.com' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <item.icon className="h-5 w-5 text-cyan-500 mr-3" />
                  <span className="text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TruckIcon, title: 'Free Shipping', subtitle: 'On orders over ₹399' },
              { icon: CreditCardIcon, title: 'Secure Payment', subtitle: '100% secure payment' },
              { icon: ShieldCheckIcon, title: 'Quality Guarantee', subtitle: '30-day return policy' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3">
                <feature.icon className="h-8 w-8 text-cyan-500" />
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-1">
            <p className="text-gray-400 text-sm">© 2025 TShirtStore. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Developed by <span className="font-bold text-white">Sahil Jadhav</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
