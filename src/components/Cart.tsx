import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  clearCart,
} from "../redux/cartSlice";
import { currencySymbolTRY } from "../constants";
import { CartProduct } from "../types/CartProduct";

interface CartProps {
  products: CartProduct[];
}

const Cart: React.FC<CartProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      <h2 className="text-xl mb-2">Cart</h2>
      <div className="border rounded-lg shadow-md p-4 bg-white">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-2 mb-2"
                >
                  <div className="flex-1">
                    <h3 className="text-lg">{product.name}</h3>
                    <p className="text-primaryColor">
                      {product.price + " " + currencySymbolTRY}
                    </p>
                  </div>
                  <div className="flex flex-col ml-4 space-y-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="h-8 w-8 bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-center"
                      >
                        -
                      </button>
                      <span className="h-8 w-8 bg-primaryColor flex items-center justify-center text-center text-white">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="h-8 w-8 bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="h-8 w-24 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Card Summary */}
      <div className="border rounded-lg shadow-md p-4 mt-4 bg-white">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-semibold text-primaryColor">
            {totalPrice + " " + currencySymbolTRY}
          </span>
        </div>
        <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-2">
          Checkout
        </button>
        <button
          onClick={handleClearCart}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </>
  );
};

export default Cart;
