import React, { Fragment, useState } from 'react';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

function Cart(props) {
    const { cartData, setCartData } = props

    const Delete = (index) => {
        const newCartItem = [...cartData]
        newCartItem.splice(index, 1)
        setCartData(newCartItem)
    }

    const navigateToHome = useNavigate()
    const goToHome = () => {
        navigateToHome('/')
    }

    const [message, setMessage] = useState(null);
    const order = async (e) => {
        e.preventDefault()
        const response = await fetch("https://foodyapp-1c2bb-default-rtdb.firebaseio.com/foody.json", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({
                cartData
            })
        })

        if (response.ok) {
            setCartData([])
            setMessage("Order Send!");
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }

    return (
        <Fragment>
            <div className='CartItem'>
                <ul>
                    {
                        cartData.map((item, index) =>
                            <li key={index}>{item.names} - {item.price}
                                <button onClick={() => Delete(index)}>X</button>
                            </li>)
                    }
                </ul>
                <button onClick={goToHome}>Home</button>
                <button onClick={order}>Order</button>
                {message && <div >{message}</div>}
            </div>
        </Fragment>
    );
}

export default Cart;