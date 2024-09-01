import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useParams } from "react-router-dom";
import axios from "axios";

import cartReducer from "../redux/cartSlice";
import ProductDetailPage from "../pages/ProductDetailPage";
import { TRY_CURRENCY_SYMBOL } from "../constants";

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Mock only useParams from react-router-dom, not the whole module
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useParams: jest.fn(),
  };
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.mocked(useParams).mockReturnValue({ id: "1" });
});

test("Product detail renders", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("ETERATION")).toBeInTheDocument();
});

describe("ProductDetailPage", () => {
  test("shows loading spinner while fetching product", () => {
    mockedAxios.get.mockResolvedValueOnce(new Promise(() => {}));

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductDetailPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays product information when fetched", async () => {
    const mockProduct = {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "A great product",
      image: "http://example.com/image.jpg",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductDetailPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("100 " + TRY_CURRENCY_SYMBOL)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("A great product")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Product 1" })).toHaveAttribute(
        "src",
        "http://example.com/image.jpg"
      );
    });
  });

  test("dispatches addProduct action when clicking 'Add to Cart'", async () => {
    const dispatch = jest.spyOn(mockStore, "dispatch");
    const mockProduct = {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "A great product",
      image: "http://example.com/image.jpg",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductDetailPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cart/addProduct",
        payload: {
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 1,
        },
      })
    );
  });
});
