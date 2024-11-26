import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./routes/HomePage.tsx";
import UploadPage from "./routes/UploadPage.tsx";
import SearchPage from "./routes/SearchPage.tsx";
import AdvancedSearchPage from "./routes/AdvancedSearchPage.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App as the layout for all pages
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/document-upload",
        element: <UploadPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
