import { FOLLOW_USER, GET_USER, UPDATE_BIO, UPLOAD_PICTURE, UNFOLLOW_USER } from "../actions/user.actions";

//Interet de l'usage de Redux
// gestion des states de l'appli
//Pour rappel, un state, c'est un objet de react pour stocker des données
//quand ceux ci sont nombreux et/ou modifiés fréquemment

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                //le ...state est pour récupérer l'ancienne valeur, sans l'écraser
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow),
            }
        
        default:
            return state;
    }
}