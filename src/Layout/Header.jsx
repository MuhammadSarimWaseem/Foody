import React, { Fragment } from 'react';
import './Header.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
    const auth = getAuth();
    const NavigateTo = useNavigate();
    const Signout = () => {
        signOut(auth).then(() => {
            NavigateTo("/Home/HomePage")
            toast.success("Logout!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "dark",
                style: {
                    width: "70%",
                    maxWidth: "300px",
                    margin: "0 auto",
                    fontSize: "14px"
                },
            });
        }).catch((error) => {
            console.log(error);
        });

    }


    return (
        <Fragment>
            <header className='header'>
                <h1>🍞 Foody</h1>
                <button onClick={Signout}>LOGOUT</button>
            </header>
            <div className='main-image'>
                <img src="https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg" alt='Background' />
            </div>
            <main style={{ marginTop: '5rem' }}></main>
        </Fragment>
    );
}

export default Header;
