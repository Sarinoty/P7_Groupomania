import React, { useEffect, useState } from "react";
import Header from '../components/header/Header';
import Thread from '../components/posts/Thread';
import PostCreator from '../components/posts/PostCreator';
import '../styles/general.scss';
import { useDispatch } from "react-redux";
import { getAllComments } from "../actions/comment.action";
import { getPosts } from "../actions/post.action";
import { getUser } from "../actions/user.action";
import { getUsers } from "../actions/users.action";
import { getLikes } from "../actions/like.action";

const PostsFeed = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadPost) {
            dispatch(getAllComments());
            dispatch(getLikes());
            dispatch(getPosts());
            dispatch(getUsers());
            dispatch(getUser(parseInt(sessionStorage.currentUser)));
            setLoadPost(false);
        }
    }, [loadPost, dispatch])

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