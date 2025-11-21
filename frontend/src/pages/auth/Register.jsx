import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle,
  Zap
} from 'lucide-react';
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
    
    if (e.target.name === 'confirmPassword' && passwordError) {
      setPasswordError('');
    }
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('PASSWORDS_DO_NOT_MATCH');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('PASSWORD_TOO_SHORT (MIN 6 CHARS)');
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

  // --- STYLES ---
  const inputClass = "w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:border-white focus:outline-none transition-all duration-300 font-mono placeholder-zinc-800 text-sm";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1 block group-focus-within/field:text-white transition-colors";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-12">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Lightning
          hue={280} // Purple hue for Registration
          xOffset={0}
          speed={0.8}
          intensity={0.5}
          size={1.2}
        />
      </div>

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, black 100%) pointer-events-none z-0"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="w-full max-w-md relative z-10">
        
        <div className="bg-black/70 backdrop-blur-md border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          
          {/* Decorative Icon */}
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <Zap className="w-4 h-4 text-purple-400" />
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-purple-500 animate-pulse"></div>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">New_User_Protocol</span>
            </div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Join<br />System
            </h1>
          </div>

          {/* Errors */}
          {(error || passwordError) && (
            <div className="mb-8 border-l-2 border-red-500 bg-red-900/20 p-4 flex items-start gap-3 animate-in fade-in slide-in-from-left-2">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Validation Error</p>
                <p className="text-xs text-red-300 font-mono">{error || passwordError}</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div className="group/field">
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClass}
                placeholder="ENTER NAME"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="group/field">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="USER@DOMAIN.COM"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="group/field">
              <div className="flex justify-between items-end mb-1">
                 <label htmlFor="password" className={labelClass}>
                   Set Security Key
                 </label>
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[9px] font-mono text-zinc-500 hover:text-white uppercase tracking-wider transition-colors"
                  >
                    {showPassword ? '[ HIDE ]' : '[ SHOW ]'}
                  </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={inputClass}
                placeholder="MIN 6 CHARACTERS"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="group/field">
              <label htmlFor="confirmPassword" className={labelClass}>
                Verify Security Key
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  className={inputClass}
                  placeholder="REPEAT PASSWORD"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {/* Success Indicator if matches and not empty */}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-2 top-4 w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 mt-8 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-purple-500/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out pointer-events-none"></div>
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <span className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-zinc-600 text-[10px] font-mono uppercase">Existing User?</span>
            <Link 
              to="/login" 
              className="text-white font-bold uppercase tracking-wider text-xs border-b border-transparent hover:border-white transition-all pb-0.5"
            >
              Access Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;