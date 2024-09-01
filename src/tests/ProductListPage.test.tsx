import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import ProductListPage from "../pages/ProductListPage";
import filterReducer from "../redux/filterSlice";
import cartReducer from "../redux/cartSlice";
import searchReducer from "../redux/searchSlice";
import App from "../App";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  preloadedState: {
    search: { searchTerm: "" },
    cart: { products: [] },
    filter: { brand: [], model: [], sortBy: null },
  },
});

describe("ProductListPage", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: "1",
          name: "Product 1",
          price: "10",
          image: "",
          brand: "Brand A",
          model: "Model X",
          createdAt: "2024-01-01",
        },
        {
          id: "2",
          name: "Product 2",
          price: "20",
          image: "",
          brand: "Brand B",
          model: "Model Y",
          createdAt: "2024-01-02",
        },
      ],
    });
  });

  test("renders and fetches products", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </Provider>
    );

    const product1 = await screen.findByText(/Product 1/i);
    const product2 = await screen.findByText(/Product 2/i);

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  test("displays no products message when there are no products", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </Provider>
    );

    const noProductsMessage = await screen.findByText(/No products found/i);
    expect(noProductsMessage).toBeInTheDocument();
  });

  test("applies filters and sorting", async () => {
    store.dispatch({
      type: "filter/setSortBy",
      payload: "Price low to high",
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </Provider>
    );

    const product1 = await screen.findByText(/Product 1/i);
    expect(product1).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    test("searches for a product and finds it", async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );

      const searchInput = screen.getByPlaceholderText("Search...");

      fireEvent.change(searchInput, { target: { value: "Product 1" } });

      await waitFor(() => {
        expect(screen.getByText("Product 1")).toBeInTheDocument();
      });

      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    });
  });
});
