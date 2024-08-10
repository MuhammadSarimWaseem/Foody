import React, { Fragment, useEffect, useState } from 'react';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Layout/Header';

function Cart(props) {
    const { cartData, setCartData } = props
    const [totalAmount, setTotalAmount] = useState(0)

    const Delete = (index) => {
        const newCartItem = [...cartData]
        newCartItem.splice(index, 1)
        setCartData(newCartItem)
    }

    const calculateTotalAmount = () => {
        let total = 0;
        cartData.forEach(item => {
            total += item.price;
        });
        setTotalAmount(total);
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [cartData]);

    const navigateToHome = useNavigate()
    const goToHome = () => {
        navigateToHome('/Meals/MealCard')
    }

    const order = async (e) => {
        e.preventDefault()
        const response = await fetch(process.env.REACT_APP_FIREBASE_CART_DATABASE_URL, {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({
                cartData
            })
        })

        if (response.ok) {
            setCartData([])
            toast("Order Send!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                style: {
                    width: "70%", // Set a responsive width
                    maxWidth: "300px", // Limit the maximum width
                    margin: "0 auto", // Center on the screen
                    fontSize: "14px" // Smaller font size for mobile
                },
            });
        } else {
            toast("Failed to send order", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                style: {
                    width: "70%", // Set a responsive width
                    maxWidth: "300px", // Limit the maximum width
                    margin: "0 auto", // Center on the screen
                    fontSize: "14px" // Smaller font size for mobile
                },
            });
        }
    }

    return (
        <Fragment >
            <Header></Header>

            <div className='CartItem'>
                <h1>CART ITEMS</h1>
                <ul>
                    {
                        cartData.map((item, index) =>
                            <li key={index}>{item.names} - {item.price}
                                <button onClick={() => Delete(index)}>X</button>
                            </li>)
                    }
                    <li>Total Amount : {totalAmount}</li>
                </ul>
                <div className='btn-div'>
                    <button onClick={goToHome}>Home</button>
                    <button onClick={order}>Order</button>
                </div>

            </div>
        </Fragment>
    );
}

export default Cart;