import { DELETE, GET, PATCH, POST } from "../utils/axios";
import ENDPOINTS from '../utils/endpoints';

export const ADD_POST = "ADD_POST";
export const GET_POSTS = "GET_POSTS";

export const addPost = (data) => {
    return () => {
        return POST(ENDPOINTS.ADD_POST, data)
            .then((res) => {
                //console.log(res)
            }
            ).catch (e => console.log('erreur : ' + e));
    }
}

export const getPosts = () => { // A enlever (ainsi que la route et le endpoint) si inutile pour gérer le rafraichissement avec images lourdes
    return (dispatch) => {
        return GET(ENDPOINTS.GET_POSTS)
            .then((res) => {
                //console.log(res)
                dispatch({type: GET_POSTS, payload: res.data});
            }).catch (e => console.log('Erreur : ' + e))
    }
}

export const deletePost = (id) => {
    return () => {
        return DELETE(`${ENDPOINTS.DELETE_POST}${id}`)
            .then((res) => {
                //console.log(res)
            })
            .catch(e => console.log(e));
    }
}

export const updatePost = (id, data) => {
    return () => {
        return PATCH(`${ENDPOINTS.UPDATE_POST}${id}`, data)
            .catch(e => console.log('Erreur : ' + e))
    }
}