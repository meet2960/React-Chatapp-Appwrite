import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </NextUIProvider>
  </React.StrictMode>
);
