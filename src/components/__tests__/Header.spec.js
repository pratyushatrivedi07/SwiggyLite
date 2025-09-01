import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "../../services/reduxStore";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../services/reducers/cartSlice";
import userReducer from "../../services/reducers/userSlice";
import CART_MOCK from "../mocks/cartSliceMock.json";
import USER_MOCK from "../mocks/userSliceMock.json";

it("should render Header Component", () => {
  render(
    <BrowserRouter>
      <Provider store={reduxStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const homeText = screen.getByText("Home");
  expect(homeText).toBeInTheDocument();
});

describe("Cart in Header", () => {
  it("should render Header with 0 Cart Items", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cart = screen.getByText("Cart");
    expect(cart).toBeInTheDocument();
  });

  it("should render Header with Cart Items", () => {
    const mockStore = configureStore({
      reducer: { user: userReducer, cart: cartReducer },
      preloadedState: {
        cart: CART_MOCK,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cart = screen.getByText("4");
    expect(cart).toBeInTheDocument();
  });
});

describe("Login/Logout Button in Header", () => {
  const mockStore = configureStore({
    reducer: { user: userReducer, cart: cartReducer },
    preloadedState: {
      user: USER_MOCK,
    },
  });

  describe("Auth Modal", () => {
    it("should open login modal when Login button is clicked", async () => {
      render(
        <BrowserRouter>
          <Provider store={reduxStore}>
            <Header />
          </Provider>
        </BrowserRouter>
      );

      const login = screen.getByText("Login");
      fireEvent.click(login);

      const authModal = await screen.findByTestId("authModal");
      expect(authModal).toBeInTheDocument();
    });

    it("should close login modal when closed button is clicked", async () => {
      render(
        <BrowserRouter>
          <Provider store={reduxStore}>
            <Header />
          </Provider>
        </BrowserRouter>
      );

      const login = screen.getByText("Login");
      fireEvent.click(login);

      const authModal = await screen.findByTestId("authModal");
      const closeBtn = screen.getByText("×");
      fireEvent.click(closeBtn);
      expect(authModal).not.toBeInTheDocument();
    });
  });

  it("should render username in Header when user is logged in", () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const username = screen.getByText("Hi, Happy");
    expect(username).toBeInTheDocument();
  });

  it("should render logout dropdown in Header when user is logged in", () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const username = screen.getByText("Hi, Happy");
    fireEvent.click(username);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should logout user and display Login Button when clicked on Logout button", () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const username = screen.getByText("Hi, Happy");
    fireEvent.click(username);
    const logout = screen.getByText("Logout");
    fireEvent.click(logout);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
