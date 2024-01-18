import './App.css';
import React, { Fragment, useState } from 'react';
import HomePage from './Home/HomePage'
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';
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
          <Route path='/*' element={<HomePage />} />
          <Route path='/Login/LoginPage' element={<LoginPage />} />
          <Route path='/SignUp/SignUpPage' element={<SignUpPage />} />
          <Route path='/Meals/MealCard' element={<MealCard updateCartData={updateCartData} />} />
          <Route path='/Carts/Cart' element={<Cart cartData={cartData} setCartData={setCartData} />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;