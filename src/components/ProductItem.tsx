import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { addProduct } from "../redux/cartSlice";
import { currencySymbolTRY } from "../constants";

interface ProductItemProps {
  id: number;
  image: string;
  name: string;
  price: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  name,
  price,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="border rounded-lg shadow-md overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={handleProductClick}
    >
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-lg text-primaryColor mb-2 flex items-center justify-start">
          {price + " " + currencySymbolTRY}
        </p>
        <h3 className="text-xl font-semibold mb-4">{name}</h3>
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation(); // So that we don't navigate when button is pressed
              handleAddToCart();
            }}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
