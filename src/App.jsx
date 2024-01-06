import './App.css';
import React, { Fragment, useState } from 'react';
import Header from './Layout/Header.jsx'
import MealCard from './Meals/MealCard';
import Cart from './Carts/Cart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [cartData, setCartData] = useState([])
  const updateCartData = (data) => {
    setCartData(data)
  }

  return (
    <Fragment>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<MealCard updateCartData={updateCartData} />} />
          <Route path='/Carts/Cart' element={<Cart cartData={cartData} />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;