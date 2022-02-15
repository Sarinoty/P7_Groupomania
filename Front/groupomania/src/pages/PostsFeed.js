import React from 'react';
import Header from '../components/header/Header';
import Thread from '../components/Thread';
import PostCreator from '../components/posts/PostCreator';
import '../styles/general.scss';

const PostsFeed = () => {
    return (
        <div className='greatContainer'>
            <Header />
            <div className='feedContainer'>
                <PostCreator />
                <Thread />
            </div>
        </div>
    );
};

export default PostsFeed;