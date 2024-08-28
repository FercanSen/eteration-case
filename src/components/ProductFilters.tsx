import React, { useState, useEffect } from "react";
import axios from "axios";
import BrandsFilter from "./Filters/BrandsFilter";
import ModelsFilter from "./Filters/ModelFilters";
import SortByFilter from "./Filters/SortByFilter";
import { Product } from "../types/Product"; // Assuming you have a Product type

const ProductFilters = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://5fc9346b2af77700165ae514.mockapi.io/products"
      );

      const uniqueBrands = Array.from(
        new Set(response.data.map((product) => product.brand))
      );

      const uniqueModels = Array.from(
        new Set(response.data.map((product) => product.model))
      );

      setBrands(uniqueBrands);
      setModels(uniqueModels);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortByFilterItems = [
    "Old to new",
    "New to old",
    "Price high to low",
    "Price low to high",
  ];

  return (
    <div>
      <SortByFilter items={sortByFilterItems} />
      <BrandsFilter items={brands} />
      <ModelsFilter items={models} />
    </div>
  );
};

export default ProductFilters;