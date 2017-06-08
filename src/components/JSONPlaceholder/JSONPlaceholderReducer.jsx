import {FETCH_POSTS, FETCH_FAILED, FETCH_POSTS_SUCCESS, FETCH_USERS_SUCCESS} from './JSONPlaceholderAction'

const initialState = {
    isFetching : true,
    posts: [],
    users: {}
}

const JSONPlaceholderReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS :
            return { 
                ...initialState 
            }
        case FETCH_USERS_SUCCESS :
            return {
                ...state,
                users: action.payload
            }
        case FETCH_POSTS_SUCCESS :
            return {
                ...state,
                posts: action.payload,
                isFetching: false
            }
        case FETCH_FAILED :
            return {
                ...state,
                isFetching: false
            }
    }
    return state
}

export default JSONPlaceholderReducer