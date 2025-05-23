// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";

// Ensure 'rootElement' is non-null using type assertion
const rootElement = document.getElementById("root") as HTMLElement;

// Create a root and render the app with Thirdweb and React Router
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Sepolia}>
      <Router>
        <App />
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
