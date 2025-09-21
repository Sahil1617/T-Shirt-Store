import { useState, useEffect } from 'react';
import { 
  PackageIcon, UsersIcon, IndianRupeeIcon, 
  ShoppingCartIcon, PlusIcon, EditIcon, 
  TrashIcon,PlusCircle,
  Edit,
  Package,
  FileText,
  Image as ImageIcon,
  Tag,
  Layers,
  X
} from 'lucide-react';
import api from '../../config/axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Red']
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        api.get('/api/admin/dashboard'),
        api.get('/api/products?limit=5'),
        api.get('/api/orders?limit=5')
      ]);

      setStats(statsRes.data.stats);
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/api/products/${editingProduct._id}`, productForm);
        toast.success('Product updated successfully');
      } else {
        await api.post('/api/products', productForm);
        toast.success('Product created successfully');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Blue', 'Red']
      });
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      colors: product.colors || ['Black', 'White', 'Blue', 'Red']
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.delete(`/api/products/${productId}`);
      toast.success('Product deleted successfully');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
  {/* Title */}
  <h1 className="text-3xl font-extrabold text-gray-900">
    Admin Dashboard
  </h1>

  {/* Add Product Button */}
  <button
    onClick={() => setShowProductForm(true)}
    className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
  >
    <PlusIcon className="h-5 w-5 mr-2" />
    Add Product
  </button>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PackageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCartIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <IndianRupeeIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PackageIcon className="h-5 w-5 mr-2" />
            Recent Products
          </h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">₹{product.price}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Recent Orders
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  ₹{order.totalAmount} • {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.01] relative">
      
      {/* Close Button */}
      <button
        onClick={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-3 flex items-center justify-center gap-2">
        {editingProduct ? (
          <>
            <Edit className="w-6 h-6 text-orange-500" />
            Edit Product
          </>
        ) : (
          <>
            <PlusCircle className="w-6 h-6 text-orange-500" />
            Add New Product
          </>
        )}
      </h2>

      {/* Form */}
      <form onSubmit={handleProductSubmit} className="space-y-5">
        
        {/* Product Name */}
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Product Name"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-2">
          <FileText className="w-5 h-5 text-gray-500 mt-2" />
          <textarea
            placeholder="Description"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            rows="3"
            required
          />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <IndianRupeeIcon className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-gray-500" />
          <input
            type="url"
            placeholder="Image URL"
            value={productForm.image}
            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Category"
            value={productForm.category}
            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Stock"
            value={productForm.stock}
            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            {editingProduct ? (
              <>
                <Edit className="w-4 h-4" /> Update Product
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" /> Create Product
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg py-2 shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
      )}
    </div>
  );
};

export default AdminDashboard;