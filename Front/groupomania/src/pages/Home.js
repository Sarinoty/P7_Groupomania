import React from 'react';
import Log from '../components/log';
import Logo from '../components/log/Logo';
import '../styles/SignInUp.scss';

const Home = () => {
    return (
        <div className='container'>
            <Logo />
            <div className='sous-container' >
                <Log />
            </div>
        </div>
    );
};

export default Home;