import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addProduct } from "../redux/cartSlice";
import { currencySymbolTRY } from "../constants";

interface ProductItemProps {
  id: number; // Add id prop
  imageUrl: string;
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  imageUrl,
  name,
  price,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id,
        name,
        price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4">
        <p className="text-lg text-primaryColor mb-2 flex items-center justify-start">
          {price.toFixed(2) + " " + currencySymbolTRY}
        </p>
        <h3 className="text-xl font-semibold mb-4">{name}</h3>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
