import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealCard.css';
import Cart from '../Carts/Cart.jsx';
import { Data } from '../Data/Data.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Layout/Header.jsx';

function MealCard({ updateCartData }) {
    const [cartItems, setCartItems] = useState([]);
    const [ShowcartItems, setShowCartItems] = useState(false);
    const [items, setItems] = useState(0);
    const NavigateTo = useNavigate();

    const addToCart = (item) => {
        setCartItems((previousList) => [...previousList, item]);
        setItems(items + 1);
        toast("🛒 Item added to cart!", {
            position: "top-right",
            autoClose: 500,
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
    };

    const showCart = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (cartItems.length > 0) {
            updateCartData(cartItems);
            setShowCartItems(true);
            if (user) {
                NavigateTo("/Carts/Cart");
            } else {
                NavigateTo("/Home/HomePage");
                toast.warn('Login First!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    };

    return (
        <Fragment>
            <Header></Header>

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
            <div className='button-div'>
                <button onClick={showCart} className='cart-button'>Cart <span className='span'>{items}</span></button>
                {ShowcartItems && <Cart setCartItems={setCartItems}></Cart>}
            </div>
        </Fragment>
    );
}

export default MealCard;
