import { useState, useEffect } from 'react';
import { PackageIcon, CalendarIcon, IndianRupeeIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
  <h1 className="text-4xl font-bold mb-10 text-gray-900 tracking-tight">
    My Orders
  </h1>

  {orders.length === 0 ? (
    <div className="text-center py-16 bg-white/60 backdrop-blur rounded-2xl border border-gray-100 shadow-inner">
      <PackageIcon className="h-20 w-20 text-gray-400 mx-auto mb-5" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
      <p className="text-gray-500">
        Your orders will appear here once you make a purchase.
      </p>
    </div>
  ) : (
    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-300"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order._id.slice(-8).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-4 py-1 mt-3 sm:mt-0 rounded-full text-sm font-semibold tracking-wide
                ${
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "Processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* Order Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <PackageIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {order.items.reduce((t, i) => t + i.quantity, 0)} items
              </span>
            </div>
            <div className="flex items-center">
              <IndianRupeeIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Items</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center bg-gray-50 rounded-xl p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Shipping Address
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default Orders;