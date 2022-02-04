import React from 'react';
import Header from '../components/header/Header';
import Post from '../components/posts/Post';
import '../styles/general.scss';

const PostsFeed = () => {
    return (
        <div className='greatContainer'>
            <Header />
            <div className='feedContainer'>
                <Post />
            </div>
        </div>
    );
};

export default PostsFeed;