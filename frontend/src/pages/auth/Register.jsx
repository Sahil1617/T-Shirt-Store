import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import Lightning from './Lightning';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear password error when user types
    if (e.target.name === 'confirmPassword' && passwordError) {
      setPasswordError('');
    }
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    await register(formData.name, formData.email, formData.password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Lightning Background */}
      <div className="absolute inset-0 z-0">
        <Lightning
          hue={280}
          xOffset={0}
          speed={0.8}
          intensity={0.6}
          size={1}
        />
      </div>

      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black/30 z-1"></div>

      {/* Register Form */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-8 relative z-10">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us today</p>
        </div>

        {(error || passwordError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
            {error || passwordError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
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
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Create a password (min. 6 characters)"
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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                className="input-field block w-full rounded-lg border border-gray-300 px-10 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;