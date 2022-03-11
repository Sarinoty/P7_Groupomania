import React from 'react';
import Log from '../components/log';
import Logo from '../components/log/Logo';
import '../styles/SignInUp.scss';

const Home = () => {
    return (
        <div className='container'>
            <div className='loader'>
                <div className='imgContainer'>
                    <img src='./imgs/icon-left-font2.png' alt='Logo de la société Groupomania' className='imgContainer__img' />
                </div>
            </div>
            <Logo />
            <div className='sous-container' >
                <Log />
            </div>
        </div>
    );
};

export default Home;