import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import Form from './components/Form';
import Item from './pages/Item';
import Footer from './components/Footer';
import Subadmin from './pages/Subadmin';


function App() {
  return (
    <Router>
      <Navbar />
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Item />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Form />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/checkout" element={<Form />} />
        <Route path = "/subadmin" element = {<Subadmin/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;