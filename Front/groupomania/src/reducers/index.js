import { combineReducers } from "redux";
import logReducer from './logReducer';
import postReducer from './postReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

export default combineReducers({
    logReducer,
    postReducer,
    usersReducer,
    userReducer
});