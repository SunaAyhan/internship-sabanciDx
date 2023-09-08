import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Property from './pages/Property';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="properties" element={<Property />} />


  
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
