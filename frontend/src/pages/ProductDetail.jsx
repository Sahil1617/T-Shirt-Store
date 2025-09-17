import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, HeartIcon, ShareIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../config/axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get(`/api/products?limit=4`);
      setRelatedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded mt-4"></div>
          <div className="h-4 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Simulating multiple images

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-primary-600">Products</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-96 mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <HeartIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill={star <= 4 ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">(42 reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="input-field w-32"
            >
              {[...Array(Math.min(product.stock || 10, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="btn-secondary">
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <TruckIcon className="h-5 w-5 mr-2 text-green-600" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-600" />
              30-day return policy
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="card p-4">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
              <p className="text-primary-600 font-bold">${relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;