import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "../../services/reduxStore";
import "@testing-library/jest-dom";

describe("Toggle betwee Login and Sign up Modal", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show Sign Up Modal when clicked on create account", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    const login = screen.getByText("Login");
    fireEvent.click(login);

    const heading = screen.getByText("create an account");

    fireEvent.click(heading);

    expect(screen.getByText("login to your account")).toBeInTheDocument();
  });

  it("should switch back to Login Modal when clicked on login", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Login"));

    fireEvent.click(screen.getByText("create an account"));

    fireEvent.click(screen.getByText("login to your account"));

    expect(screen.getByText("create an account")).toBeInTheDocument();
  });
});

describe("Login Form", () => {
  it("should show the password when clicked on eye icon in login form", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Login"));

    const password = screen.getByPlaceholderText("Password");
    const eyeIcon = screen.getByTestId("pwdClose");

    fireEvent.change(password, { target: { value: "happy@123" } });
    fireEvent.click(eyeIcon);

    expect(screen.getByDisplayValue("happy@123")).toBeInTheDocument();
  });

  it("should fill login form", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Login"));

    const userName = screen.getByPlaceholderText("Username");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(userName, { target: { value: "happy" } });
    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "happy@123" } });
  });
});

describe("Signup Form", () => {
  it("should fill signup form", () => {
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Login"));

    fireEvent.click(screen.getByText("create an account"));

    const firstName = screen.getByPlaceholderText("First Name");
    const lastName = screen.getByPlaceholderText("Last Name");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const signupBtn = screen.getByRole("button", { name: "Sign up" });

    fireEvent.change(firstName, { target: { value: "happy" } });
    fireEvent.change(lastName, { target: { value: "singh" } });
    fireEvent.change(email, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "happy@123" } });

    fireEvent.click(signupBtn);

    expect(screen.getByText("Hi, Happy")).toBeInTheDocument();
  });
});
