
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Router";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./components/Authcontext";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
