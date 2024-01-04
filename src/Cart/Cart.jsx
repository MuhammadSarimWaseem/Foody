import React, { Fragment } from 'react';
import './Cart.css'
function Cart({ cartItems, setCartItems }) {

    const Delete = (index) => {
        const newCartItem = [...cartItems]
        newCartItem.splice(index, 1)
        setCartItems(newCartItem)
    }

    return (
        <Fragment>
            <div className='CartItem'>
                <ul>
                    {
                        cartItems.map((item, index) => <li key={index}>{item.names} - {item.price}
                            <button onClick={() => Delete(index)}>X</button>
                        </li>)
                    }
                </ul>
            </div>
        </Fragment>
    );
}

export default Cart;