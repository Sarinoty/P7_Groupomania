import React from 'react';
import Header from '../components/header/Header';
import ProfileCard from '../components/Profile';
import '../styles/Header.scss';

const Profile = () => {
    return (
        <div className='greatContainer'>
            <Header />
            <div className='feedContainer'>
                <ProfileCard />
            </div>
        </div>
    );
};

export default Profile;