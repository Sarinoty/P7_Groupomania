import { DELETE, GET, POST } from "../utils/axios";
import ENDPOINTS from '../utils/endpoints';

export const ADD_COMMENT = "ADD_COMMENT";
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const addComment = (data) => {
    return () => {
        return POST(ENDPOINTS.ADD_COMMENT, data)
            .then((res) => {
                //console.log(data)
            }
            ).catch (e => console.log('erreur : ' + e));
    }
}

export const getAllComments = () => {
    return (dispatch) => {
        return GET(ENDPOINTS.GET_COMMENTS)
            .then((res) => {
                dispatch({type: GET_ALL_COMMENTS, payload: res.data});
            })
            .catch(e => console.log('Erreur : ' + e))
    }
}

export const getComments = (id) => {
    return (dispatch) => {
        return GET(`${ENDPOINTS.GET_COMMENTS}${id}`)
            .then((res) => {
                dispatch({type: GET_COMMENTS, payload: res.data});
            })
            .catch(e => console.log('Erreur : ' + e))
    }
}

export const deleteComment = (id) => {
    return () => {
        return DELETE(`${ENDPOINTS.DELETE_COMMENT}${id}`)
            .catch(e => console.log(e))
    }
}

export const deleteCommentByPostId = (id) => {
    return () => {
        return DELETE(`${ENDPOINTS.DELETE_COMMENT_BYPOSTID}${id}`)
            .catch(e => console.log(e))
    }
}

export const deleteCommentsByUserId = (id) => {
    return () => {
        return DELETE(`${ENDPOINTS.DELETE_COMMENTS_BYUSERID}${id}`)
            .catch(e => console.log(e))
    }
}