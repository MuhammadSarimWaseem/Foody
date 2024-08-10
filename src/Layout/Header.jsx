import React, { Fragment } from 'react';
import './Header.css';

function Header() {
    return (
        <Fragment>
            <header className='header'>
                <h1>🍞 Foodie</h1>
            </header>
            <div className='main-image'>
                <img src="https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg" alt='Background' />
            </div>
        </Fragment>
    );
}

export default Header;
