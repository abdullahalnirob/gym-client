import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./Context/AuthContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PrimeReactProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </AuthProvider>
  </StrictMode>
);
