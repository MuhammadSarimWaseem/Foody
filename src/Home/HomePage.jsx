import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { getAuth, signOut } from "firebase/auth";
import Header from '../Layout/Header';

function HomePage() {
    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error);
    });

    const navigateToLogin = useNavigate();
    const Login = () => {
        navigateToLogin('/Login/LoginPage');
    }

    const navigateToSignUp = useNavigate();
    const SignUp = () => {
        navigateToSignUp('/SignUp/SignUpPage');
    }

    return (
        <Fragment>
            <Header></Header>

            <div className="cont">
                <form className='form'>
                    <h1>Welcome!</h1>
                    <p>Sign up or log in to continue</p>
                    <button className='button' onClick={Login}>Log in</button>
                    <button className='button' onClick={SignUp}>Sign up</button>
                </form>
            </div>
        </Fragment>
    );
}

export default HomePage;
