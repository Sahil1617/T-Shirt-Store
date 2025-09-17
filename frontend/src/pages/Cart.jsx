import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { items, updateCartItem, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg p-12">
          <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-6">Add some products to your cart!</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {items.map((item) => (
              <div key={item.product._id} className="border-b border-gray-200 p-6 flex items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartItem(item.product._id, Math.max(1, item.quantity - 1))}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  
                  <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="ml-6 text-right">
                  <span className="text-lg font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="ml-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Link to="/products" className="btn-secondary">
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {user ? (
              <Link to="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center">Please login to checkout</p>
                <Link to="/login" className="btn-primary w-full text-center block">
                  Login to Checkout
                </Link>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;