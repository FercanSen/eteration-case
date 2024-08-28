import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cart from "../components/Cart";
import { Product } from "../types/Product";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addProduct } from "../redux/cartSlice";
import { currencySymbolTRY } from "../constants";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addProduct({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      );
    }
  };

  return (
    <div className="flex appPadding pt-8">
      <div className="flex-1 p-4 mx-4 shadow-md bg-white border rounded-lg">
        <div className="flex flex-col items-center lg:flex-row">
          {/* Product Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            {product ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>

          {/* Product Information */}
          <div className="lg:ml-8 flex-1 mt-4 lg:mt-0">
            {product ? (
              <div>
                <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
                <p className="text-xl mb-4">
                  {product.price + " " + currencySymbolTRY}
                </p>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors my-4"
                >
                  Add to Cart
                </button>
                <p className="mb-4">{product.description}</p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-1/6">
        <Cart products={cartProducts} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
