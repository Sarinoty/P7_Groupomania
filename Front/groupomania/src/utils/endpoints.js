const endpoints = {
    USER_SIGNUP: 'api/auth/signup',
    USER_LOGIN: 'api/auth/login',
    ADD_POST: 'api/post/',
    GET_POSTS: 'api/post/',
    GET_POST: 'api/post/',
    GET_USERS: 'api/user/',
    GET_USER: 'api/user/',
    UPDATE_USER: 'api/user/updateProfile/',
    DELETE_USER: 'api/user/',
    DELETE_POST: 'api/post/',
    ADD_COMMENT: 'api/comment/',
    GET_COMMENTS: 'api/comment/',
    DELETE_COMMENT: 'api/comment/',
    DELETE_COMMENT_BYPOSTID: 'api/comment/post/',
    DELETE_COMMENTS_BYUSERID: 'api/comment/user/',
    GET_LIKES: 'api/likes/',
    ADD_LIKE: 'api/likes/',
    DELETE_LIKE: 'api/likes/deleteLike/',
    DELETE_LIKE_BYPOSTID: 'api/likes/',
    DELETE_LIKE_BYUSERID: 'api/likes/user/'
}

export default endpoints;