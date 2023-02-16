import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import NavBarContextProvider from "./contexts/NavBarContext";
import GenresContextProvider from "./contexts/GenreContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 60 * 1, // 1 hours
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GenresContextProvider>
          <NavBarContextProvider>
            <App />
          </NavBarContextProvider>
        </GenresContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
