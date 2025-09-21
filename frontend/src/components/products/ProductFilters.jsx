import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductFilters = ({ filters, onFilterChange }) => {
  const categories = ['Men', 'Women', 'Graphic', 'Plain', 'Premium'];
  const priceRanges = [
    { label: 'Under ₹100', value: '0-25' },
    { label: '₹100 - ₹300', value: '25-50' },
    { label: '₹300 - ₹700', value: '50-100' },
    { label: 'Over ₹700', value: '100+' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      priceRange: '',
      sort: 'newest'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.toLowerCase()}
                checked={filters.category === category.toLowerCase()}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Sort By</h4>
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;