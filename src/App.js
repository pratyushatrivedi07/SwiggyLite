import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CategoryRestaurants from "./components/CategoryRestaurants";
import RestaurantMenu from "./components/RestaurantMenu";
import SearchShimmerUI from "./components/SearchShimmerUI";
import { Provider } from "react-redux";
import reduxStore from "./services/reduxStore";

const Help = lazy(() => import("./components/Help"));
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const OrderSummary = lazy(() => import("./components/OrderSummary"));

const AppLayout = () => {
  return (
    <Provider store={reduxStore}>
      <div className="app dark:bg-gray-800">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<SearchShimmerUI />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/help",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Help />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:category",
        element: <CategoryRestaurants />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/order-summary",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <OrderSummary />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
