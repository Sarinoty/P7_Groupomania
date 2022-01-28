import React from 'react';
import { zIndex } from '../../actions/log.action';

const SignInForm = () => {
    return (
        <div onClick={zIndex(0)} className='cadre cadre__signin'>
            <h1>Se connecter</h1>
            <form method='get' className='form'>
                <div className='form__question'>
                    <label htmlFor="email">Adresse e-mail :</label>
                    <input type="email" name='email' required></input>
                    <p id='emailError'>Test</p>
                </div>
                <div className='form__question'>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name='password' required></input>
                    <p id='passwordError'>Test</p>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;