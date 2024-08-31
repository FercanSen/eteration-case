import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  clearCart,
} from "../../redux/cartSlice";
import { TRY_CURRENCY_SYMBOL } from "../../constants";
import { CartProduct } from "../../types/CartProduct";

import "../../styles/cart.css";
import CartItem from "./CartItem";

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
    (total, product) => total + Number(product.price) * product.quantity,
    0
  );

  return (
    <>
      <h2 className="text-xl mb-2">Cart</h2>
      <div className="border rounded-lg shadow-md p-4 bg-white cartStyle">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  onRemoveProduct={handleRemoveProduct}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Cart Summary */}
      <div className="border rounded-lg shadow-md p-4 mt-4 bg-white">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-semibold text-primaryColor">
            {totalPrice + " " + TRY_CURRENCY_SYMBOL}
          </span>
        </div>
        <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-2">
          Checkout
        </button>
        {products.length > 0 && (
          <button
            onClick={handleClearCart}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;
