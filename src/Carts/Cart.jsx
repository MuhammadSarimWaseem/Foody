import React, { Fragment } from 'react';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

function Cart(props) {
    const { cartData,setCartData } = props

    const Delete = (index) => {
        const newCartItem = [...cartData]
        newCartItem.splice(index, 1)
        setCartData(newCartItem)
    }

    const navigateToHome = useNavigate()
    const goToHome = () => {
        navigateToHome('/')
    }

    return (
        <Fragment>
            <div className='CartItem'>
                <ul>
                    {
                        cartData.map((item, index) => <li key={index}>{item.names} - {item.price}
                            <button onClick={() => Delete(index)}>X</button>
                        </li>)
                    }
                </ul>
                <button onClick={goToHome}>Home</button>
                <button>Order</button>
            </div>
        </Fragment>
    );
}

export default Cart;