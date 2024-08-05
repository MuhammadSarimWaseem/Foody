import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { getAuth, signOut } from "firebase/auth";

function HomePage() {
    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error);

    });

    const navigateToLogin = useNavigate()
    const Login = () => {
        navigateToLogin('/Login/LoginPage')
    }

    const navigateToSignUp = useNavigate()
    const SignUp = () => {
        navigateToSignUp('/SignUp/SignUpPage')
    }

    return (
        <Fragment>
            <form className='form'>
                <h1>Welcome!</h1>
                <p>Sign up or log in to continue</p>
                <button className='button' onClick={Login}>Log in</button>
                <button className='button' onClick={SignUp}>Sign up</button>
            </form>
        </Fragment>
    );
}
export default HomePage;