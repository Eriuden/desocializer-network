import axios from "axios";

export const GET_POSTS = "GET_POSTS"
export const GET_ALLPOSTS= "GET_ALLPOSTS"
export const ADD_POST = "ADD_POST"
export const LIKE_POST = "LIKE_POST"
export const UNLIKE_POST = "UNLIKE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST= "DELETE_POST"


//section comments
export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

export const GET_TRENDS = "GET_TRENDS"

export const GET_POST_ERRORS = "GET_POST_ERRORS"

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then ((res) => {
            //avec slice, il coupe ce qui est après 0 et num
            //Ainsi là, il affichera un nombre maximum de posts
            const array = res.data.slice(0, num)
            dispatch ({type: GET_POSTS, payload: array})
            dispatch ({type:GET_ALLPOSTS, payload: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
            if (res.data.errors) {
                dispatch( {type: GET_POST_ERRORS, payload: res.data.errors })
            } else {
                dispatch({ type: GET_POST_ERRORS, payload: ""})
            }
        })
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message},
        })
        .then((res) => {
            dispatch({ type: UPDATE_POST, payload: {message, postId} })
        })
        .catch((err) => console.log(err))
    }
}

export const likePost = () => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}/api/post/like-post/` + postId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({type: LIKE_POST, payload:{postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const unLikePost = () => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}/api/post/unlike-post/` + postId,
            data: { id: userId}
        })
        .then((res) => {
            dispatch({type: UNLIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const deletePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:{message},
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, payload: {postId} })
        })
        .catch((err) => console.log(err))
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data:{commenterId, text, commenterPseudo},
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, payload: {postId} })
        })
        .catch((err) => console.log(err))
    }
}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data:{commentId, text},
        })
        .then((res) => {
            dispatch({ type: EDIT_COMMENT, payload: {postId, commentId, text} })
        })
        .catch((err) => console.log(err))
    }
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data:{commentId},
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, payload: {postId, commentId} })
        })
        .catch((err) => console.log(err))
    }
}

export const getTrends = (sortedArray) => {
    return (dispatch) => {
        dispatch({type: GET_TRENDS, payload: sortedArray})
    }
}