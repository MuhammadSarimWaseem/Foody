import './App.css';
import React, { Fragment } from 'react';
import Header from './Layout/Header.jsx'
import MealCard from './Meals/MealCard';
import Cart from './Cart/Cart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Fragment>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<MealCard />} />
          <Route path='./Cart/Cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;