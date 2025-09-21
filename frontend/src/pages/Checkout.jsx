import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockIcon, TruckIcon } from 'lucide-react';
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
          price: item.product.price
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
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
        <p className="text-gray-400">Add some products to proceed with checkout</p>
      </div>
    );
  }

  return (
   <div className="max-w-6xl mx-auto p-6 lg:p-10">
  <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
    🧾 Checkout
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    {/* Checkout Form */}
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-5 flex items-center">
            <CreditCardIcon className="h-5 w-5 mr-2 text-orange-500" />
            Contact Information
          </h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-5 flex items-center">
            <TruckIcon className="h-5 w-5 mr-2 text-orange-500" />
            Shipping Address
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="input-field mt-4 w-full text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="United States">India</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-5 flex items-center">
            <LockIcon className="h-5 w-5 mr-2 text-orange-500" />
            Payment Information
          </h2>

          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="input-field w-56 text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              className="input-field text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <input
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={formData.nameOnCard}
            onChange={handleInputChange}
            className="input-field w-56 mt-4 text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-lg font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition disabled:opacity-50 shadow-md"
        >
          {loading ? "Processing..." : "Complete Order"}
        </button>
      </form>
    </div>

    {/* Order Summary */}
    <div>
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.product._id} className="flex items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-14 h-14 object-cover rounded-lg shadow-sm"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-gray-900">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>₹{(getCartTotal() * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3 text-gray-900">
            <span>Total</span>
            <span>₹{(getCartTotal() * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Checkout;