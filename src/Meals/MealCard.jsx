import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealCard.css'
import Cart from '../Carts/Cart.jsx';
import { Data } from '../Data/Data.jsx'

function MealCard({ updateCartData }) {
    const [cartItems, setCartItems] = useState([])
    const [ShowcartItems, setShowCartItems] = useState(false)
    const NavigateToCart = useNavigate()

    const addToCart = (item) => {
        setCartItems((previousList) => {
            return [...previousList, item]
        })
    }

    const showCart = () => {
        setShowCartItems(true)
        updateCartData(cartItems)
        
        NavigateToCart("/Carts/Cart")

    }

    return (
        <Fragment>
            <div className="cardlist">
                {Data.map((val) => (
                    <div key={val.id}>
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Dish: {val.names}</h5>
                                <p className="card-text">Price: {val.price}</p>
                                <button onClick={() => addToCart(val)}>➕</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={showCart}>Cart</button>
            {ShowcartItems && cartItems.length>0 && <div className='cart'>
                <Cart cartItems={cartItems} setCartItems={setCartItems} ></Cart>
            </div>}

        </Fragment>
    );
}

export default MealCard;