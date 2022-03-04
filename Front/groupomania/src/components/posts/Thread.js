import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import { isEmpty } from "../Utils";

const Thread = () => {
    const posts = useSelector((state) => state.postReducer);
    
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