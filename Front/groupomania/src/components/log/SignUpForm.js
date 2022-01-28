import React from 'react';
import { useSelector } from 'react-redux';
import { zIndex } from '../../actions/log.action';

const SignUpForm = () => {
    const zindex = useSelector((state) => state.logReducer);
    console.log(zindex);

    return (
        <div onClick={zIndex(2)} className='cadre cadre__signup' style={{zIndex: zindex}}>
            <h1>S'incrire</h1>
            <form method='get' className='form'>
                <div className='form__question'>
                    <label htmlFor="email">Adresse e-mail :</label>
                    <input type="email" name='email' required></input>
                    <p id='emailError'>Test</p>
                </div>
                <div className='form__question'>
                    <label htmlFor="firstName">Prénom :</label>
                    <input type="text" name='firstName' required></input>
                    <p id='firstNameError'>Test</p>
                </div>
                <div className='form__question'>
                    <label htmlFor="lastName">Nom :</label>
                    <input type="text" name='lastName' required></input>
                    <p id='lastNameError'>Test</p>
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

export default SignUpForm;