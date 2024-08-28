import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductListPage from "./ProductListPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import cartReducer from "../redux/cartSlice";
import searchReducer from "../redux/searchSlice";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
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

  describe("Redux Provider Wrapping", () => {
    const store = configureStore({
      reducer: {
        filter: filterReducer,
        cart: cartReducer,
        search: searchReducer,
      },
      preloadedState: {
        search: { searchTerm: "test" },
        cart: { products: [] },
        filter: { brand: [], model: [], sortBy: null },
      },
    });

    test("throws error if not wrapped with Provider", () => {
      expect(() => render(<App />)).toThrow(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    });

    test("renders correctly when wrapped with Provider", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      expect(screen.getByTestId("search-term")).toHaveTextContent("test");
    });
  });
});
