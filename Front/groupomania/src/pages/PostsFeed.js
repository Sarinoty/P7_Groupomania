import React from 'react';
import Header from '../components/header/Header';
import Post from '../components/posts/Post';
import PostCreator from '../components/posts/PostCreator';
import '../styles/general.scss';

const PostsFeed = () => {
    return (
        <div className='greatContainer'>
            <Header />
            <div className='feedContainer'>
                <PostCreator />
                <Post />
            </div>
        </div>
    );
};

export default PostsFeed;