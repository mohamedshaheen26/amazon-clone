import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { auth } from "../firebase";
import { useAuth } from "./context/GlobalState";
import Login from "./components/login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

function App() {
  const { dispatch } = useAuth();
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
              <Payment />
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
