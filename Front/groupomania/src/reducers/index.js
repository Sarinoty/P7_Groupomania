import { combineReducers } from "redux";
import logReducer from './logReducer';
import postReducer from './postReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import likesReducer from './likesReducer';

export default combineReducers({
    logReducer,
    postReducer,
    usersReducer,
    userReducer,
    commentReducer,
    likesReducer
});