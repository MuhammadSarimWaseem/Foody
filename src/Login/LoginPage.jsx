import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import './LoginPage.css';
import { toast } from 'react-toastify';
import Header from '../Layout/Header';

function LoginPage() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const InputHandler = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const [message, setMessage] = useState(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const Login = async (e) => {
        e.preventDefault();
        const { email, password } = input;

        if (email && password) {
            setSubmitButtonDisabled(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                    setSubmitButtonDisabled(false);
                    navigate("/Meals/MealCard");
                    toast("Login!", {
                        position: "top-right",
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
                })
                .catch((error) => {
                    setSubmitButtonDisabled(false);
                    setMessage(error.message);
                });

            setInput({
                email: "",
                password: ""
            });
        } else {
            setMessage("Please fill all the fields");
        }
    };

    return (
        <Fragment>
            <Header></Header>

            <form onSubmit={Login}>
                <h1>LOGIN</h1>
                Email:<input required name='email' onChange={InputHandler} placeholder='Enter your Email' type='email' value={input.email} ></input><br />
                Password:<input required name='password' onChange={InputHandler} placeholder='Enter your Password' type="current-password" value={input.password} /><br />
                <button className='button' disabled={submitButtonDisabled} type='submit' >Log in</button>
                <p>
                    Don't have an account?{" "}
                    <span>
                        <Link to="/SignUp/SignUpPage">Sign up</Link>
                    </span>
                </p>
                {message && <div className="message">{message}</div>}
            </form>
        </Fragment>
    );
}

export default LoginPage;