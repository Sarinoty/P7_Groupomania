import { combineReducers } from "redux";
import logReducer from './logReducer';
import postReducer from './postReducer';

export default combineReducers({
    logReducer,
    postReducer
});