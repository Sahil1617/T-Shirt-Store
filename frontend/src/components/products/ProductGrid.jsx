import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, viewMode = 'grid' }) => {
  if (loading) {
    return (
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded mt-4"></div>
            <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
      : "space-y-4"
    }>
      {products.map(product => (
        <ProductCard key={product._id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ProductGrid;