import React from 'react';
import {SignIn, SignUp} from '../../reducers/logContainer';

const log = () => {
    const width = window.innerWidth;
    return (
        <div className={width < 1300 ? 'cards' : 'cards2'}>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default log;