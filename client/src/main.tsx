// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.tsx";
import "./index.css";
import { StateContextProvider } from "./context/index.jsx";

// Ensure 'rootElement' is non-null using type assertion
const rootElement = document.getElementById("root") as HTMLElement;

// Create a root and render the app with Thirdweb and React Router
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="sepolia"
      clientId="e80953cef0f3d220f954952879910880"
      desiredChainId={11155111}
    >
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
