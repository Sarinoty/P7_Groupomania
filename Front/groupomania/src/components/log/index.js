import React from 'react';
//import SignInForm from './SignInForm';
//import SignUpForm from './SignUpForm';
import {SignIn, SignUp} from '../../reducers/logContainer';


const log = () => {
    return (
        <div className='cards'>
            <SignIn />
            <SignUp />
        </div>
    );
};

/* const log = () => {
    return (
        <div className='cards'>
            <SignUpForm />
            <SignInForm />
        </div>
    );
}; */

export default log;