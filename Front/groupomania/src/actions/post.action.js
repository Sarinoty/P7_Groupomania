import { GET, POST } from "../utils/axios";
import ENDPOINTS from '../utils/endpoints';

export const ADD_POST = "ADD_POST";
export const GET_POSTS = "GET_POSTS";

export const addPost = (data) => {
    return (/* dispatch */) => {
        return POST(ENDPOINTS.ADD_POST, data)
            .then((res) => {
                console.log(res)
            }
            ).catch (e => console.log('erreur : ' + e));
    }
}

export const getPosts = () => {
    return (dispatch) => {
        return GET(ENDPOINTS.GET_POSTS)
            .then((res) => {
                console.log(res)
                dispatch({type: GET_POSTS, payload: res.data});
            }).catch (e => console.log('Erreur : ' + e))
    }
}