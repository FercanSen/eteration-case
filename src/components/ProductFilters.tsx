import BrandsFilter from "./Filters/BrandsFilter";
import ModelsFilter from "./Filters/ModelFilters";
import SortByFilter from "./Filters/SortByFilter";

const ProductFilters = () => {
  const sortByFilterItems = [
    "Old to new",
    "New to old",
    "Price high to low",
    "Price low to high",
  ];
  const brandsFilterItems = ["Apple", "Samsung", "Huawei"];
  const modelsFilterItems = ["11", "12 Pro", "13 Max"];
  return (
    <div>
      <SortByFilter items={sortByFilterItems} />
      <BrandsFilter items={brandsFilterItems} />
      <ModelsFilter items={modelsFilterItems} />
    </div>
  );
};

export default ProductFilters;
