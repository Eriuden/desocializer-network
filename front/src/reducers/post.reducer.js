import { DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.actions";

const initialState = {}

export default function postReducer(state= initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload
        case LIKE_POST:
            return state.map((post,userId) => {
                if (post._id === action.payload.postId)
                    return {
                        ...post,
                        likers: [action.payload,userId, ...post.likers]
                    }
            })
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId)
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)                       
                    }
                return post
            })
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                } else return post
            })
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId)
        case EDIT_COMMENT:
            return state.map((post) => {
                //on commence par mapper les posts et chercher le bon
                if(post._id === action.payload.postId){
                    return {
                        ...post,
                        //Puis ensuite on fait pareil avec les comments
                        comment: post.comment.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    //On empèche l'écrasement des données, puis on charge le texte
                                    ...comment,
                                    text: action.payload.text
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return post
            })
        case DELETE_COMMENT:    
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comment.filter((comment) => comment._id !== action.payload.commentId)
                }
        
            } else return post
        }) 

        default:
            return state
    }
}