import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
import {isLogin} from './features/login-state/loginState';

import './App.css';

function App() {

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
