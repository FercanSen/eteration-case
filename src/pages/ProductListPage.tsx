import { useSelector } from "react-redux";
import ProductFilters from "../components/ProductFilters";
import ProductItem from "../components/ProductItem";
import { RootState } from "../redux/store";
import Cart from "../components/Cart";

const ProductListPage = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const products = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 1",
      price: 29.99,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 2",
      price: 39.99,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 3",
      price: 29.99,
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 4",
      price: 39.99,
    },
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 1",
      price: 29.99,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      name: "Product 2",
      price: 39.99,
    },
  ];

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
              id={product.id}
              imageUrl={product.imageUrl}
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
