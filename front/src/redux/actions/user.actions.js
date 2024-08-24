import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"
export const FOLLOW_USER= "FOLLOW_USER"
export const UNFOLLOW_USER= "UNFOLLOW_USER"

export const GET_USER_ERRORS= "GET_USER_ERRORS"

//une const d'action redux est toujours écrite ainsi
// on retourne avec en param dispatch
//on retourne ici axios car on fait appel à une requète du back
//on inscrit donc l'appel de requète en axios
// en promesse, on fait le dispatch de redux
//qui a pour type une const comme au dessus qui donne son nom à l'action
//puis le payload qui contient les données de l'objet qui nous intéresse
//comme on a d'abord read l'user, c'est ici simplement les données globales de la réponse de la requète
//j'aurais mis la requète des postes, il aurait les données des postes
//Le catch permet de gérer une erreur de requète, le paramètres permettra au code de gérer ça tout seul

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
        //dans le cas d'un get, le param est entres accolades
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data})
            })
            .catch((err) => console.log(err))
    }
}

//Dans le cas de post, il faut un params hors url pour gérer la création de données
//Comme la requète d'au dessus, l'autre param sert pour que la requète inscrive l'id dans l'url

export const uploadPicture = (data,id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                if (res.data.errors) {
                    dispatch({ type: GET_USER_ERRORS, payload: res.data.errors})
                } else {
                    dispatch ({ type: GET_USER_ERRORS, payload:""})
                    return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    //Ici, on a besoin de traiter que l'image dans les données
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                    })
                } 
            })
            .catch((err) => console.log(err))
        }
}

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            //méthode pour update: put
            // on prends la requète de read des user, et on précise qu'on veut la bonne id
            // data =  paramètre pour ce qu'on modifiera, qui fera office de payload aussi
            //cette fois, pas besoin de get en fin, on modifie, comme dirait Laviosier...
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({type: UPDATE_BIO , payload:bio})
            })
            .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: { idToFollow },
        })
            .then ((res) => {
                dispatch({ type :FOLLOW_USER, payload:{idToFollow}})
            })
            .catch((err) => console.log(err))
    }
}

export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { idToUnfollow },
        })
            .then ((res) => {
                dispatch({ type :UNFOLLOW_USER, payload:{idToUnfollow}})
            })
            .catch((err) => console.log(err))
    }
}