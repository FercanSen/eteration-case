import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductFilters from "../components/ProductFilters";
import ProductItem from "../components/ProductItem";
import Cart from "../components/Cart";
import Pagination from "../components/Pagination";
import { RootState } from "../redux/store";
import { Product } from "../types/Product";
import { ITEMS_PER_PAGE } from "../constants";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const selectedBrands = useSelector((state: RootState) => state.filter.brand);
  const selectedModels = useSelector((state: RootState) => state.filter.model);
  const sortBy = useSelector((state: RootState) => state.filter.sortBy);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>(
          "https://5fc9346b2af77700165ae514.mockapi.io/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply search, brand, model, and sorting filters
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedBrands?.length ? selectedBrands.includes(product.brand) : true
    )
    .filter((product) =>
      selectedModels?.length ? selectedModels.includes(product.model) : true
    );

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price high to low")
      return Number(b.price) - Number(a.price);
    if (sortBy === "Price low to high")
      return Number(a.price) - Number(b.price);
    if (sortBy === "New to old")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "Old to new")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  // Calculate total pages based on the filtered and sorted number of products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  // Calculate the index range for products to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productsToDisplay = sortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 pt-8">
        {/* Product Filters */}
        <div className="w-full lg:w-1/6 mb-4 lg:mb-0">
          <ProductFilters />
        </div>
        {/* Product List */}
        <div className="flex-1 p-4">
          {loading ? (
            // Show Spinner while loading
            <LoadingSpinner />
          ) : (
            // Show products or no products found
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {productsToDisplay.length > 0 ? (
                productsToDisplay.map((product) => (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  />
                ))
              ) : (
                <p className="flex items-center justify-center">
                  No products found
                </p>
              )}
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
        {/* Cart */}
        <div className="w-full lg:w-1/6">
          <Cart products={cartProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
