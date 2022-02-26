import React/* , { useEffect, useState } */ from "react";
import { /* useDispatch, */ useSelector } from "react-redux";
/* import { getAllComments } from "../actions/comment.action";
import { getPosts } from "../actions/post.action";
import { getUser } from "../actions/user.action";
import { getUsers } from "../actions/users.action";
import { getLikes } from "../actions/like.action"; */
import Post from "./posts/Post";
import { isEmpty } from "./Utils";

const Thread = () => {
    /* const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch(); */
    const posts = useSelector((state) => state.postReducer);

    /* useEffect(() => {
        if (loadPost) {
            dispatch(getAllComments());
            dispatch(getLikes());
            dispatch(getPosts());
            dispatch(getUsers());
            dispatch(getUser(parseInt(sessionStorage.currentUser)));
            setLoadPost(false);
        }
    }, [loadPost, dispatch]) */
    
    return (
        <div className="thread">
            {!isEmpty(posts[0]) &&
            posts.map((post) => {
                return <Post post={post} key={post.postId} />
            })}
        </div>
    )
}

export default Thread;