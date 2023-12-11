import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CartProvider from "./store/CardProvider";
import Header from "./components/Layout/Header";
import LoginForm from "./components/Pages/LoginForm";
import Home from "./components/Pages/Home";
import Cart from "./components/Cart/Cart";
import AuthContext from "./store/auth-context";
import Orders from "./components/Pages/Orders"
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      <CartProvider>
        <Header onShowCart={showCartHandler} />
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Routes>
          {!authCtx.isLoggedIn && <Route path="/login" element={<LoginForm />} />}

          <Route
            path="/home"
            element={
              authCtx.isLoggedIn ? (
                <Home />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/order" element={<Orders/>}></Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;