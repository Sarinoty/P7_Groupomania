import React from 'react';
import {SignIn, SignUp} from '../../reducers/logContainer';

const log = () => {
    return (
        <div className='cards'>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default log;