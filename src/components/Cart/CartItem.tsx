import React from "react";
import { CartProduct } from "../../types/CartProduct";
import { TRY_CURRENCY_SYMBOL } from "../../constants";

interface CartItemProps {
  product: CartProduct;
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onRemoveProduct: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
}) => {
  return (
    <div className="flex cartContainer items-center justify-between border-b last:border-b-0 pb-2 mb-2">
      <div className="flex-1 overflow-hidden">
        <h3 className="text-lg">{product.name}</h3>
        <p className="text-primaryColor text-sm">
          {product.price + " " + TRY_CURRENCY_SYMBOL}
        </p>
      </div>
      <div className="quantityButtons flex flex-col ml-4 space-y-2">
        <div className="flex items-center">
          <button
            onClick={() => onDecreaseQuantity(product.id)}
            className="h-8 w-8 bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-center rounded-l-lg"
          >
            -
          </button>
          <span className="h-8 w-8 bg-primaryColor flex items-center justify-center text-center text-white">
            {product.quantity}
          </span>
          <button
            onClick={() => onIncreaseQuantity(product.id)}
            className="h-8 w-8 bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-center rounded-r-lg"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemoveProduct(product.id)}
          className="h-8 w-24 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
