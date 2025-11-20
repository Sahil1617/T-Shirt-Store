import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockIcon, TruckIcon, ShieldCheckIcon, MapPinIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
        })),
        totalAmount: getCartTotal() * 1.08, // Including tax
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      await api.post('/api/orders', orderData);
      clearCart();
      navigate('/orders?success=true');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some amazing products to proceed with checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Secure Checkout
          </h1>
          <p className="text-gray-600 text-lg">Complete your purchase safely and securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <CreditCardIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                    <p className="text-sm text-gray-500">We'll send your confirmation here</p>
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <TruckIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                    <p className="text-sm text-gray-500">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State / Province"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP / Postal Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 hover:border-gray-300"
                    >
                      <option value="United States">India</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <LockIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                    <p className="text-sm text-gray-500">Your payment details are secure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on Card"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                    required
                  />
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="flex items-center text-sm text-green-700">
                    <ShieldCheckIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Secure SSL Encrypted Payment</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <LockIcon className="w-5 h-5 mr-2" />
                    Complete Secure Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order Summary</span>
              </h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product._id} className="flex items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-md"
                      />
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">Size : {item.size} | Quantity : {item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-6 space-y-3 text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-bold flex items-center">
                    <TruckIcon className="w-4 h-4 mr-1" />
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold text-gray-900">₹{(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t-2 border-gray-200 pt-4">
                  <span className="text-gray-900">Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{(getCartTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <ShieldCheckIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-blue-900">Secure Payment</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <TruckIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-green-900">Free Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;