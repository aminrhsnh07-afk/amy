import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import komponen kamu
import App from "./App.tsx";
import SignIn from "./auth/signin.tsx";
import SignUp from "./auth/signup.tsx";

// 1. Buat konfigurasi router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Halaman utama
  },
  {
    path: "/signin",
    element: <SignIn />, // Halaman Sign In
  },
  {
    path: "/signup",
    element: <SignUp />, // Halaman Sign Up
  },
]);

// 2. Gunakan RouterProvider di dalam render
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);