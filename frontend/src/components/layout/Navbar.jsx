import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  HomeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`bg-white/98 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "shadow-lg border-gray-200/50" 
          : "shadow-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <img
                  src="/vite.svg"
                  alt="Logo"
                  className="w-7 h-7 filter brightness-0 invert"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="ml-3 font-extrabold text-xl text-gray-900 hidden sm:block">
                TShirt<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Store</span>
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 bg-gray-50 focus:bg-white"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-all"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActiveRoute("/")
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActiveRoute("/products")
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActiveRoute("/about")
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActiveRoute("/contact")
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Contact
            </Link>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <Link
              to="/cart"
              className="relative p-2.5 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-xl group"
            >
              <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 p-2 pl-3 hover:bg-blue-50 rounded-xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold">
                    {user.name}
                  </span>
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center group/item"
                  >
                    <UserIcon className="h-5 w-5 mr-3 group-hover/item:scale-110 transition-transform" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center group/item"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-3 group-hover/item:scale-110 transition-transform" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center group/item"
                    >
                      <ShieldCheckIcon className="h-5 w-5 mr-3 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  )}
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center group/item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 mr-3 group-hover/item:scale-110 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold hover:bg-blue-50 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors hover:bg-blue-50 rounded-lg"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-2xl rounded-b-3xl overflow-hidden">
            {/* Search Bar - Mobile */}
            <div className="p-4 border-b border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
            </div>

            <div className="py-3 px-4 space-y-1">
              <Link
                to="/"
                className={`flex items-center py-3.5 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  isActiveRoute("/")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Home
              </Link>
              <Link
                to="/products"
                className={`flex items-center py-3.5 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  isActiveRoute("/products")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-3" />
                Products
              </Link>
              <Link
                to="/about"
                className={`flex items-center py-3.5 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  isActiveRoute("/about")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
                About
              </Link>
              <Link
                to="/contact"
                className={`flex items-center py-3.5 px-4 rounded-xl transition-all duration-300 font-semibold ${
                  isActiveRoute("/contact")
                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PhoneIcon className="h-5 w-5 mr-3" />
                Contact
              </Link>

              {user ? (
                <>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-3" />
                    My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShieldCheckIcon className="h-5 w-5 mr-3" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all mt-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-3"></div>
                  <Link
                    to="/login"
                    className="flex items-center py-3.5 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold justify-center mt-2 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;