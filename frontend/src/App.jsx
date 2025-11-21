import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Orders from './pages/Orders';
import DebugAuth from './components/DebugAuth';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <DebugAuth/>
        <Router>
          {/* 
            Updated Main Container: 
            - bg-black: Forces dark mode base
            - selection: Custom text highlight color (Editorial style)
          */}
          <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            
            {/* 
              Updated Toaster: 
              - Square corners (borderRadius: 0)
              - Monospace font
              - High contrast borders
            */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                className: '!bg-black !text-white !font-mono !uppercase !text-xs !tracking-widest !rounded-none !border !border-zinc-800',
                style: {
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: '0px',
                  padding: '16px 24px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                },
                success: {
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                  },
                  style: {
                    border: '1px solid #22c55e', // Green border for success
                  }
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                  style: {
                    border: '1px solid #ef4444', // Red border for error
                  }
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;