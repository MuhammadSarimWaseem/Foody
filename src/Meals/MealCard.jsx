import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealCard.css'
import Cart from '../Carts/Cart.jsx';
import { Data } from '../Data/Data.jsx'

function MealCard({ updateCartData }) {
    const [cartItems, setCartItems] = useState([])
    const [ShowcartItems, setShowCartItems] = useState(false)
    const [items,setItems ] = useState(0)
    const NavigateToCart = useNavigate()

    const addToCart = (item) => {
        setCartItems((previousList) => {
            return [...previousList, item]
        })
        setItems(items+1)
    }

    const showCart = () => {
        if (cartItems.length > 0) {
            updateCartData(cartItems)
            setShowCartItems(true)
            NavigateToCart("/Carts/Cart")
        }
    }

    return (
        <Fragment>
            <div className="cardlists">
                {Data.map((val) => (
                    <div key={val.id}>
                        <div className="card" style={{ width: "21.7rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Dish: {val.names}</h5>
                                <p className="card-text">Price: {val.price}</p>
                                <button className='add-button' onClick={() => addToCart(val)}>➕</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={showCart} className='cart-button'>Cart <span>{items}</span></button>
            {ShowcartItems && <div className='cart'>
                <Cart setCartItems={setCartItems}></Cart>
            </div>}
        </Fragment>
    );
}

export default MealCard;