import React, { Fragment, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
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
    const { name, email, password } = input;

    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: name,
          });
          navigate(" /Meals/MealCard");
          toast("Account Created!", {
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
        name: "",
        email: "",
        password: ""
      });
    } else {
      setMessage("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <form onSubmit={Login}>
        <h1>SIGN UP</h1>
        Name:<input required name='name' onChange={InputHandler} placeholder='Enter your name' type='text' value={input.name}></input><br />
        Email:<input required name='email' onChange={InputHandler} placeholder='Enter your Email' type='email' value={input.email} ></input><br />
        Password:<input required name='password' onChange={InputHandler} placeholder='Enter your Password' type="current-password" value={input.password} /><br />
        <button className='button' disabled={submitButtonDisabled} type='submit'>Sign up</button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/Login/LoginPage">Login</Link>
          </span>
        </p>
        {message && <div className="message">{message}</div>}
      </form>
    </Fragment>
  );
};

export default SignUpPage;