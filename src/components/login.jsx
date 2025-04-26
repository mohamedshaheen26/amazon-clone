import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

import logo from "../assets/login-logo.png";
import "./login.css";

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
      if (auth) {
        navigate("/");
      }
    });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login-logo' src={logo} alt='logo-img' />
      </Link>
      <div className='login-container'>
        <h1>Sign In</h1>
        <form onSubmit={login}>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='signin-btn' type='sumbit'>
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button className='register-btn' onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default login;
