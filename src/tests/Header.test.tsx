import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "../redux/searchSlice";
import { TRY_CURRENCY_SYMBOL } from "../constants";

const mockStore = configureStore({
  reducer: {
    search: searchReducer,
  },
  preloadedState: {
    search: {
      searchTerm: "",
    },
  },
});

describe("Header Component", () => {
  test("renders correctly", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("ETERATION")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(
      screen.getByText("117.00 " + TRY_CURRENCY_SYMBOL)
    ).toBeInTheDocument();
    expect(screen.getByText("Kerem")).toBeInTheDocument();
  });
});
