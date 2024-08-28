import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ProductFilters from "../components/ProductFilters";
import ProductItem from "../components/ProductItem";
import Cart from "../components/Cart";

import { RootState } from "../redux/store";
import { Product } from "../types/Product";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "https://5fc9346b2af77700165ae514.mockapi.io/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex appPadding pt-8">
      {/* Product Filters */}
      <div className="w-1/6">
        <ProductFilters />
      </div>
      {/* Product List */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/6">
        <Cart products={cartProducts} />
      </div>
    </div>
  );
};

export default ProductListPage;
