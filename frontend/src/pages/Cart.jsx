import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { items, updateCartItem, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-130 bg-gray-50">
        <div className="bg-white rounded-3xl shadow-xl p-10 sm:p-12 text-center max-w-md mx-auto">
          <ShoppingBagIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-700 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8">
            Looks like you haven’t added any products yet. Start shopping to
            fill your cart!
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-orange-400 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 tracking-tight">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`} // unique key per product + size
                  className="flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition-all"
                >
                  {/* Product Image + Info */}
                  <div className="flex items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    />

                    <div className="ml-5">
                      <h3 className="font-semibold text-xl text-gray-900">
                        {item.product.name}
                      </h3>

                      {/* ✅ Size display */}
                      {
                        <span className="inline-block mt-1 text-sm font-medium text-black px-2 py-1 rounded-lg">
                          Size: {item.size}
                        </span>
                      }

                      <p className="text-gray-500 mt-1 text-lg">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        updateCartItem(
                          item.product._id,
                          Math.max(1, item.quantity - 1),
                          item.size // ✅ Pass size here too
                        )
                      }
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <MinusIcon className="h-5 w-5 text-gray-700" />
                    </button>

                    <span className="w-12 text-center text-lg font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartItem(
                          item.product._id,
                          item.quantity + 1,
                          item.size // ✅ Already passed here
                        )
                      }
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <PlusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right ml-6">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product._id, item.size)}
                    className="ml-6 p-2 rounded-full hover:bg-red-50 transition"
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-600 text-lg">
                Your cart is empty.{" "}
                <Link to="/products" className="text-blue-600 underline">
                  Shop now
                </Link>
                .
              </div>
            )}
          </div>

          {/* Actions */}
          {items.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <Link
                to="/products"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-semibold transition"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ₹{getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>₹{(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {user ? (
              <Link
                to="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-xl font-semibold transition shadow-md"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center">
                  Please login to checkout
                </p>
                <Link
                  to="/login"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-xl font-semibold transition shadow-md"
                >
                  Login to Checkout
                </Link>
              </div>
            )}

            <p className="mt-5 text-sm text-center text-gray-500">
              ✅ Free shipping on orders over ₹399
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;