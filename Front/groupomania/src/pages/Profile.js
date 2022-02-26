import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/header/Header';
import ProfileCard from '../components/profile/Profile';
import '../styles/Header.scss';
import { getUser } from '../actions/user.action';
import { getPosts } from '../actions/post.action';

const Profile = () => {
    const [loadProfile, setLoadProfile] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadProfile) {
            dispatch(getUser(parseInt(sessionStorage.currentUser)));
            dispatch(getPosts());
            setLoadProfile(false);
        }
    }, [loadProfile, dispatch])

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