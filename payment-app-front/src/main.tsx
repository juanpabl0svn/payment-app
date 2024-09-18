import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import Home from "./pages/home.page";
import { Provider } from "react-redux";
import { store } from "./store";

import "./index.css";
import ProductDetail from "./pages/product-detail.page";
import Layout from "./layout";
import Transaction from "./pages/transaction.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/product",
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <Home />,
      },
      {
        path: "/transactions/:id",
        element: <Transaction />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
