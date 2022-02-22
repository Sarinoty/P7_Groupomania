import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { dateParser, spaceBetween } from "../../utils/Date";
import { deleteComment, getAllComments } from "../../actions/comment.action";

const Comment = (com) => {
    const commentData = useSelector((state) => state.commentReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const postsData = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();

    return (
        <div className="comment__container">
            {console.log('console.log de test')}
            {console.log()}
            <div className="divider"></div>
            <div className="comment__head">
                <div className="comment__head__identity">
                    <img
                        className="comment__head__avatar"
                        src={usersData.map((user) => {if(user.userId === com.comment.authorId) return user.imageUrl}).join('')}
                        alt="avatar"
                        ></img>
                    <div className="comment__head__name">{usersData.map((user) => {if(user.userId === com.comment.authorId) return user.firstName + ' ' + user.lastName})}</div>
                </div>
                {com.comment.authorId === parseInt(sessionStorage.currentUser) && (
                    <FontAwesomeIcon icon={faTimes} className='fas-times' onClick={async() => {
                        if(window.confirm("Etes-vous sûr(e) ?\n(Cette action est irréversible)")) {
                            await dispatch(deleteComment(com.comment.comId));
                            dispatch(getAllComments());
                        }
                    }}/>
                )}
                
            </div>
            <div className="comment__body">{com.comment.textContent}</div>
            <div className="comment__foot">{'Il y a ' + spaceBetween(com.comment.date, Date.now())}</div>
        </div>
    )
};

export default Comment;