import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "../../services/reduxStore";
import "@testing-library/jest-dom";
import Search from "../Search";
import MOCK_DATA from "../mocks/resListMock.json";
import { act } from "react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("should render Search Component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    )
  );

  const searchStr = screen.getByPlaceholderText(
    "Search restaurants by name or cuisines..."
  );

  expect(searchStr).toBeInTheDocument();
});

it("should search restaurant list for Pizza text input on Button click", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    )
  );

  const searchStr = screen.getByPlaceholderText(
    "Search restaurants by name or cuisines..."
  );

  fireEvent.focus(searchStr);
  fireEvent.change(searchStr, { target: { value: "Pizza" } });

  const searchBtn = screen.getByText("Search");
  fireEvent.click(searchBtn);

  const searchResList = screen.getAllByTestId("searchRes");
  expect(searchResList.length).toBe(3);
});

it("should search restaurant list for Ice cream text input on pressing Enter key", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    )
  );

  const searchStr = screen.getByPlaceholderText(
    "Search restaurants by name or cuisines..."
  );

  fireEvent.focus(searchStr);
  fireEvent.change(searchStr, { target: { value: "Ice cream" } });

  fireEvent.keyDown(searchStr, { key: "Enter", code: "Enter" });

  const searchResList = screen.getAllByTestId("searchRes");
  expect(searchResList.length).toBe(2);
});

it("should return No Match Found string when there are no restaurants rendered", async () => {
  await act(() =>
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    )
  );

  const searchStr = screen.getByPlaceholderText(
    "Search restaurants by name or cuisines..."
  );

  fireEvent.focus(searchStr);
  fireEvent.change(searchStr, { target: { value: "Dosa" } });

  const searchBtn = screen.getByText("Search");

  fireEvent.click(searchBtn);

  const searchResult = screen.getByText(/No match/);
  expect(searchResult).toBeInTheDocument();
});

it("should clear input box when clicked on back button", async () => {
  await act(() =>
    render(
      <BrowserRouter>
        <Provider store={reduxStore}>
          <Search />
        </Provider>
      </BrowserRouter>
    )
  );

  const searchStr = screen.getByPlaceholderText(
    "Search restaurants by name or cuisines..."
  );

  fireEvent.focus(searchStr);
  fireEvent.change(searchStr, { target: { value: "Dosa" } });

  const searchBtn = screen.getByText("Search");

  fireEvent.click(searchBtn);

  const backBtn = screen.getByTestId("backBtn");
  fireEvent.click(backBtn);

  expect(searchStr).toBeInTheDocument();
});
