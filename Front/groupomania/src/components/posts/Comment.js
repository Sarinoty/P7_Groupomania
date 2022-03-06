import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { spaceBetween } from "../../utils/Date";
import { deleteComment, getAllComments } from "../../actions/comment.action";

const Comment = (com) => {
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    return (
        <div className="comment__container">
            <div className="comment__avatar">
                <img
                    className="comment__avatar--img"
                    src={usersData.map((user) => {if(user.userId === com.comment.authorId) return user.imageUrl; else return null}).join('')}
                    alt="avatar">
                </img>
            </div>
            <div className="comment__content">
                <div className="comment__content__light">
                    <div className="comment__content__name">{usersData.map((user) => {if(user.userId === com.comment.authorId) return user.firstName + ' ' + user.lastName; else return null})}</div>
                    {(com.comment.authorId === parseInt(sessionStorage.currentUser) || userData.isAdmin)&& (
                        <FontAwesomeIcon icon={faTimes} className='fas-times comment__content__delete' onClick={async() => {
                            if(window.confirm("Etes-vous sûr(e) ?\n(Cette action est irréversible)")) {
                                await dispatch(deleteComment(com.comment.comId));
                                dispatch(getAllComments());
                            }
                        }}/>
                    )}
                    <div className="comment__body">{com.comment.textContent}</div>
                </div>
                <div className="comment__foot">{'Il y a ' + spaceBetween(com.comment.date, Date.now())}</div>
            </div>
        </div>
    )
};

export default Comment;