import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import Lightning from './Lightning';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    navigate('/');
  };

  // --- STYLES ---
  const inputClass = "w-full bg-transparent border-b border-zinc-700 text-white p-4 focus:border-white focus:outline-none transition-all duration-300 font-mono placeholder-zinc-700 text-sm";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2 block";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Lightning Effect (Z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Lightning
          hue={200} // Desaturated blue/white for a colder look
          xOffset={0}
          speed={1.5}
          intensity={1}
          size={1.2}
        />
      </div>

      {/* 2. Technical Grid Overlay (Z-0) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 3. Vignette to focus center */}
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, black 100%) pointer-events-none z-0"></div>


      {/* --- MAIN CONTENT (Z-10) --- */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Glass Panel Container */}
        <div className="bg-black/70 backdrop-blur-md border border-white/10 p-8 sm:p-12 relative overflow-hidden group">
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <Zap className="w-4 h-4 text-white" />
          </div>

          {/* Header */}
          <div className="mb-12 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">System_Access_Node</span>
            </div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              User<br />Login
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 border-l-2 border-red-500 bg-red-900/20 p-4 flex items-start gap-3 animate-in fade-in slide-in-from-left-2">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Access Denied</p>
                <p className="text-xs text-red-300 font-mono">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Email */}
            <div className="group/field">
              <label htmlFor="email" className={labelClass}>
                Identity / Email
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

            {/* Password */}
            <div className="group/field">
              <div className="flex justify-between items-end mb-2">
                 <label htmlFor="password" className={labelClass}>
                   Security Key
                 </label>
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[9px] font-mono text-zinc-500 hover:text-white uppercase tracking-wider transition-colors"
                  >
                    {showPassword ? '[ HIDE INPUT ]' : '[ SHOW INPUT ]'}
                  </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={inputClass}
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group/check">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="remember-me"
                    className="peer sr-only"
                  />
                  <div className="w-3 h-3 border border-zinc-600 peer-checked:bg-white peer-checked:border-white transition-all"></div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 group-hover/check:text-zinc-300 transition-colors uppercase tracking-wider">Keep Session Active</span>
              </label>
              
              <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                Forgot Key?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 mt-8 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <span className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Authenticate <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer / Register */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-zinc-600 text-[10px] font-mono uppercase">No ID Found?</span>
            <Link 
              to="/register" 
              className="text-white font-bold uppercase tracking-wider text-xs border-b border-transparent hover:border-white transition-all pb-0.5"
            >
              Register New User
            </Link>
          </div>

        </div>

        {/* Admin Access Link - Styled as System Command */}
        <div className="mt-8 flex justify-center">
           <Link 
             to="/admin/login" 
             className="inline-flex mt-4 mb-8 items-center bg-gray-500 gap-2 text-[10px] font-mono text-white hover:text-black transition-colors uppercase tracking-[0.2em] border border-transparent hover:border-zinc-800 px-4 py-2"
           >
             <Terminal className="w-3 h-3" />
             Admin Login
           </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;