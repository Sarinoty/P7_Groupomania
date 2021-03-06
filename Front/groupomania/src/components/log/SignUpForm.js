import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { POST } from '../../utils/axios';
import ENDPOINTS from '../../utils/endpoints';

const SignUpForm = (props) => {
        const [email, setEmail] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [password, setPassword] = useState('');
        const zindex = useSelector((state) => state.logReducer);

        const handleSignUp = (event) => {
            event.preventDefault();
            const emailError = document.getElementById('emailUpError');
            const firstNameError = document.getElementById('firstNameUpError');
            const lastNameError = document.getElementById('lastNameUpError');
            const passwordError = document.getElementById('passwordUpError');

            POST(ENDPOINTS.USER_SIGNUP, {email, firstName, lastName, password})
            .then((res) => {
                switch (res.data.message) {
                    case 'exists' :
                        emailError.innerHTML = 'Cette adresse existe déjà';
                        firstNameError.innerHTML = '';
                        lastNameError.innerHTML = '';
                        passwordError.innerHTML = '';
                        break;
                    case 'badInputMail' :
                        emailError.innerHTML = 'Vérifiez le format de l\'adresse e-mail !';
                        firstNameError.innerHTML = '';
                        lastNameError.innerHTML = '';
                        passwordError.innerHTML = '';
                        break;
                    case 'badInputFirstName' :
                        emailError.innerHTML = '';
                        firstNameError.innerHTML = 'Cela ne semble pas être un prénom valide...';
                        lastNameError.innerHTML = '';
                        passwordError.innerHTML = '';
                        break;
                    case 'badInputLastName' :
                        emailError.innerHTML = '';
                        firstNameError.innerHTML = '';
                        lastNameError.innerHTML = 'Cela ne semble pas être un nom valide...';
                        passwordError.innerHTML = '';
                        break;
                    case 'invalidPassword' :
                        emailError.innerHTML = '';
                        firstNameError.innerHTML = '';
                        lastNameError.innerHTML = '';
                        passwordError.innerHTML = 'Le mot de passe doit contenir 7 à 20 caractères, au moins une majuscule, une minuscule et un chiffre et ne contenir aucun espace';
                        break;
                    case 'success' :
                        sessionStorage.setItem('currentUser', res.data.user);
                        sessionStorage.setItem('token', res.data.token);
                        window.location = '/postsfeed';
                        break;
                    default :
                        emailError.innerHTML = '';
                        firstNameError.innerHTML = '';
                        lastNameError.innerHTML = '';
                        passwordError.innerHTML = '';
                }
            }).catch(error => console.log(error));
        }


        return (
            <div onClick={props.increment} className='cadre cadre__signup' style={{zIndex: zindex}}>
                <h1>S'incrire</h1>
                <form method='get' className='form' onSubmit={handleSignUp}>
                    <div className='form__question'>
                        <label htmlFor="email">Adresse e-mail :</label>
                        <input
                            type="text"
                            name='email'
                            id='email'
                            required
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}></input>
                        <p id='emailUpError'></p>
                    </div>
                    <div className='form__question'>
                        <label htmlFor="lastName">Nom :</label>
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            /* required */
                            onChange={(event) => setLastName(event.target.value)}
                            value={lastName}></input>
                        <p id='lastNameUpError'></p>
                    </div>
                    <div className='form__question'>
                        <label htmlFor="firstName">Prénom :</label>
                        <input
                            type="text"
                            name='firstName'
                            id='firstNAme'
                            /* required */
                            onChange={(event) => setFirstName(event.target.value)}
                            value={firstName}></input>
                        <p id='firstNameUpError'></p>
                    </div>
                    <div className='form__question'>
                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            required
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}></input>
                        <p id='passwordUpError'></p>
                    </div>
                    <div className='form__butt'>
                        <input className='form__butt__button' type="submit" value="Valider"/>
                    </div>
                </form>
            </div>
        );
};

export default SignUpForm;