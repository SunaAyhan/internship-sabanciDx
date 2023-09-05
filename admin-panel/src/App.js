import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />

  
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
