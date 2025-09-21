import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, ShieldIcon } from 'lucide-react';
import Lightning from '../auth/Lightning';
import api from '../../config/axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/admin/auth/login', formData);
      await login(formData.email, formData.password, true);
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Lightning Background */}
      <div className="absolute inset-0 z-0">
        <Lightning
          hue={180}
          xOffset={0}
          speed={0.7}
          intensity={0.8}
          size={1}
        />
      </div>

      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Admin Login Form */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-8 relative z-10">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <ShieldIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <div className="mt-1 relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in as Admin'
            )}
          </button>

          {/* Demo Credentials */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 text-center mb-2">Demo Admin Credentials:</p>
            <div className="text-xs text-gray-600 space-y-1 text-center">
              <p>Email: admin@gmail.com</p>
              <p>Password: admin123</p>
            </div>
          </div>

          {/* Back to Store Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <a 
              href="/" 
              className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors font-medium inline-flex items-center"
            >
              ← Back to Store
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;