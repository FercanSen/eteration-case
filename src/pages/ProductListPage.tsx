import ProductFilters from "../components/ProductFilters";
import ProductItem from "../components/ProductItem";

const ProductListPage = () => {
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

  const handleAddToCart = (productId: number) => {
    console.log(`Add product ${productId} to cart`);
  };
  return (
    <div className="flex appPadding pt-8">
      <div className="w-1/5">
        <ProductFilters />
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
