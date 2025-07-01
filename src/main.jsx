import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          toastOptions={{
            duration: 5000,
          }}
        />

        <App />
      </AuthProvider>
    </BrowserRouter>
);
