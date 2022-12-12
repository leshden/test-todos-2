import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/header/Header';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';

import './App.css';

function App() {

  const { login } = useSelector((state: RootState) => state.login)
  const navigate = useNavigate();

  useEffect(()=> {
    navigate ('/', {replace: true} );
  }, [login])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
