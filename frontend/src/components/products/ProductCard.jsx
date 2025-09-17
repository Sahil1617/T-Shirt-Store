import { Link } from 'react-router-dom';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-primary-600">${product.price}</span>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <HeartIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <EyeIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/product/${product._id}`} className="card p-4 group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
            <HeartIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors">
        {product.name}
      </h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary-600">${product.price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-primary-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;