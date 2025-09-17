import { useState, useEffect } from 'react';
import { PackageIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <PackageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No orders yet</h2>
          <p className="text-gray-400">Your orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="text-gray-600 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

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
                    {order.items.reduce((total, item) => total + item.quantity, 0)} items
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.shippingAddress && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Shipping Address:</h4>
                  <p className="text-gray-600">
                    {order.shippingAddress.name}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
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