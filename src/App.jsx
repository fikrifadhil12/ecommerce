import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CheckoutPage from "./CheckoutPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token dari localStorage:", token);

      if (!token) {
        console.log("Token tidak ditemukan, logout pengguna.");
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Response dari backend:", data);

        if (response.ok && data.valid) {
          console.log("Token valid, user terautentikasi.");
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          console.log("Token tidak valid, menghapus token.");
          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          {/* Redirect ke dashboard setelah login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard cartItems={cartItems} setCartItems={setCartItems} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/checkout"
            element={
              isAuthenticated ? (
                <CheckoutPage cartItems={cartItems} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
