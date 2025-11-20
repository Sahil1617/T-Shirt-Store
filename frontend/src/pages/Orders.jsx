import { useState, useEffect } from 'react';
import { 
  PackageIcon, 
  CalendarIcon, 
  IndianRupeeIcon, 
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../config/axios';
import { Link } from 'react-router-dom';

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
      console.log('Orders data received:', response.data);
      
      if (response.data.length > 0 && response.data[0].items.length > 0) {
        console.log('First item structure:', response.data[0].items[0]);
      }
      
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'delivered':
        return {
          color: 'text-green-700 bg-green-50 border-green-200',
          dotColor: 'bg-green-500',
          icon: CheckCircleIcon,
          label: 'Delivered'
        };
      case 'shipped':
        return {
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          dotColor: 'bg-blue-500',
          icon: TruckIcon,
          label: 'Shipped'
        };
      case 'processing':
        return {
          color: 'text-amber-700 bg-amber-50 border-amber-200',
          dotColor: 'bg-amber-500',
          icon: ClockIcon,
          label: 'Processing'
        };
      case 'cancelled':
        return {
          color: 'text-red-700 bg-red-50 border-red-200',
          dotColor: 'bg-red-500',
          icon: XCircleIcon,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'text-gray-700 bg-gray-50 border-gray-200',
          dotColor: 'bg-gray-500',
          icon: PackageIcon,
          label: status
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="animate-pulse space-y-8">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded-md w-56"></div>
              <div className="h-5 bg-gray-100 rounded w-72"></div>
            </div>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="h-24 bg-gray-100 rounded-t-xl"></div>
                <div className="p-8 space-y-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-32 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Order History
          </h1>
          <p className="text-base lg:text-lg text-gray-600">
            Track and manage all your orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-8 py-16 sm:px-12 sm:py-20 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PackageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  No orders yet
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  When you place your first order, it will appear here.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.orderStatus);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-6 lg:px-8 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1.5">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></span>
                        <span className={`
                          inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                          text-sm font-semibold border
                          ${statusConfig.color}
                        `}>
                          <StatusIcon className="h-4 w-4" />
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 lg:px-8 py-6 lg:py-8">
                    {/* Order Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
                      <div className="bg-gray-50 rounded-lg p-4 lg:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <PackageIcon className="h-5 w-5 text-gray-500" />
                          <p className="text-sm font-medium text-gray-600">Total Items</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {order.items.reduce((total, item) => total + item.quantity, 0)}
                        </p>
                      </div>

                      <div className="bg-primary-50 rounded-lg p-4 lg:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <IndianRupeeIcon className="h-5 w-5 text-primary-600" />
                          <p className="text-sm font-medium text-primary-700">Total Amount</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{order.totalAmount?.toFixed(2) || '0.00'}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 lg:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <CalendarIcon className="h-5 w-5 text-blue-600" />
                          <p className="text-sm font-medium text-blue-700">Order Date</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Items Section */}
                    <div className="mb-8">
                      <h4 className="text-base font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">
                        Order Items ({order.items.length})
                      </h4>
                      
                      <div className="space-y-4">
                        {order.items.map((item, index) => {
                          console.log(`Item ${index} data:`, item);
                          const displaySize = item.size || item.selectedSize || item.product?.size || 'N/A';

                          return (
                            <div
                              key={`${item.product?._id || item._id}-${index}`}
                              className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
                            >
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <img
                                  src={item.product?.image || '/placeholder-product.jpg'}
                                  alt={item.product?.name || 'Product'}
                                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                  onError={(e) => {
                                    e.target.src = '/placeholder-product.jpg';
                                  }}
                                />
                              </div>
                              
                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                  {item.product?.name || 'Product Not Available'}
                                </h5>
                                
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">Size:</span>
                                    <span className="font-medium text-gray-900">{displaySize}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">Qty:</span>
                                    <span className="font-medium text-gray-900">{item.quantity}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">Price:</span>
                                    <span className="font-medium text-gray-900">₹{item.price?.toFixed(2) || '0.00'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Subtotal */}
                              <div className="sm:text-right sm:min-w-[120px]">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Subtotal</p>
                                <p className="text-lg font-bold text-gray-900">
                                  ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <MapPinIcon className="h-5 w-5 text-gray-500" />
                          Shipping Information
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-5">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Recipient Name</p>
                                <p className="font-semibold text-gray-900">
                                  {order.shippingAddress.name}
                                </p>
                              </div>
                              {order.shippingAddress.phone && (
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</p>
                                  <p className="text-gray-900 flex items-center gap-1.5">
                                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                                    {order.shippingAddress.phone}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Delivery Address</p>
                              <div className="text-gray-900 space-y-1">
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                <p className="font-semibold">PIN: {order.shippingAddress.zipCode}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;