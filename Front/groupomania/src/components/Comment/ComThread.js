import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import Comment from "./Comment";

const ComThread = (post) => {
    const comments = useSelector((state) => state.commentReducer);

    return (
        <div className="comThread">
            {!isEmpty(comments[0]) &&
                comments.map((comment) => {if(comment.postId === post.postId) return <Comment comment={comment} key={comment.comId} />; else return false})}
        </div>
    )
}

export default ComThread;