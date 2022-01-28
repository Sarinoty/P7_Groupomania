import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const log = () => {
    return (
        <div className='cards'>
            <SignUpForm />
            <SignInForm />
        </div>
    );
};

export default log;