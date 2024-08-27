import React from "react";

interface ProductItemProps {
  imageUrl: string;
  name: string;
  price: number;
  onAddToCart: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  imageUrl,
  name,
  price,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4">
        <p className="text-xl font-bold text-gray-800 mb-2">
          {price.toFixed(2)} &#8378;
        </p>
        <h3 className="text-lg font-semibold mb-4">{name}</h3>
        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
