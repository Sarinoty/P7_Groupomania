import { GET_ALL_COMMENTS, GET_COMMENTS } from "../actions/comment.action";

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS :
            return action.payload;
        case GET_ALL_COMMENTS :
            return action.payload;
        default :
            return state;
    }
}