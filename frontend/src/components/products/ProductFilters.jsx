import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ProductFilters = ({ filters, onFilterChange }) => {
  const categories = ['Men', 'Women', 'Graphic', 'Plain', 'Premium'];
  const priceRanges = [
    { label: 'Under ₹200', value: '0-200' },
    { label: '₹200 - ₹300', value: '200-300' },
    { label: '₹300 - ₹700', value: '300-700' },
    { label: 'Over ₹700', value: '700+' }
  ];

  const handleFilterChange = (key, value) => {
    // Toggle logic: if clicking the active filter, clear it
    const newValue = filters[key] === value ? '' : value;
    onFilterChange({
      ...filters,
      [key]: newValue
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Filter By</h3>
      </div>

      {/* Categories Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = filters.category === category.toLowerCase();
            return (
              <motion.button
                key={category}
                whileHover={{ x: 4 }}
                onClick={() => handleFilterChange('category', category.toLowerCase())}
                className={`w-full flex items-center justify-between group p-2 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {category}
                </span>
                
                {/* Custom Radio Indicator */}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'border-purple-500 bg-purple-500/20' : 'border-gray-600 group-hover:border-gray-400'
                }`}>
                  {isActive && (
                    <motion.div 
                      layoutId="cat-indicator"
                      className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isActive = filters.priceRange === range.value;
            return (
              <motion.button
                key={range.value}
                whileHover={{ x: 4 }}
                onClick={() => handleFilterChange('priceRange', range.value)}
                className={`w-full flex items-center justify-between group p-2 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {range.label}
                </span>

                {/* Square Checkbox Style for variety */}
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'border-purple-500 bg-purple-500/20' : 'border-gray-600 group-hover:border-gray-400'
                }`}>
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 bg-purple-500 rounded-[1px]" 
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Tags (Optional visual feedback) */}
      {(filters.category || filters.priceRange) && (
        <div className="pt-4 border-t border-white/10">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300">
                {filters.category}
                <button onClick={() => handleFilterChange('category', filters.category)} className="hover:text-white">
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-300">
                {priceRanges.find(r => r.value === filters.priceRange)?.label || filters.priceRange}
                <button onClick={() => handleFilterChange('priceRange', filters.priceRange)} className="hover:text-white">
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;