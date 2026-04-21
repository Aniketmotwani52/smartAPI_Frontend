import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import Users from "../pages/Users.tsx";
import APIs from "../pages/Apis.tsx";
import Logs from "../pages/Logs.tsx";
import Proxy from "../pages/Proxy.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import AppLayout from "../components/layout/AppLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "apis",
        element: <APIs />,
      },
      {
        path: "logs",
        element: <Logs />,
      },
      {
        path: "proxy",
        element: <Proxy />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
