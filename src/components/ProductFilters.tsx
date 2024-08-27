import SortByFilter from "./Filters/SortByFilter";

const ProductFilters = () => {
  const sortByItems = [
    "Old to new",
    "New to old",
    "Price high to low",
    "Price low to high",
  ];
  return (
    <div>
      <SortByFilter items={sortByItems} />
    </div>
  );
};

export default ProductFilters;
