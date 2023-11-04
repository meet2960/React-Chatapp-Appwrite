import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home/Home";
import ChatPage from "../pages/Chat/ChatPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/chats/:id",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/signup",
    element: <RegisterPage />,
    ErrorBoundary: ErrorPage,
  },
]);
