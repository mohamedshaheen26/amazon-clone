import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { auth } from "../firebase";
import { useAuth } from "./context/GlobalState";
import Login from "./components/login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51RIBBgRWO12b2ekiGcXz5dYrH56HlXjPWU0SBGwaOa32cDY1pK4ajUW5qqjgxVLP70wluUXPhPZ9trBoGL9bJj0T00QCkVJiSH"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path='/checkout'
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path='/payment'
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path='/orders'
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
