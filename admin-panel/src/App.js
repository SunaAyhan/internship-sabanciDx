import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
  
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
