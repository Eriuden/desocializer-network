import React, { useContext, useEffect, useState } from 'react'
import {UidContext} from "../AppContext"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likePost, unLikePost } from '../../actions/post.actions'
import { useDispatch } from 'react-redux'

export default function LikeButton({post}) {
    const [liked, setLiked] =useState(false)
    const uid = useContext(UidContext)
    const dispatch= useDispatch()

    //les post.untel sont des React props
    //en effet like button est marqué likebutton post={post.id} de la même manière que dans delete, il comprendra donc ca veut dire quoi la props
    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true)
    }
    const unLike = () => {
        dispatch(unLikePost(post._id, uid))
        setLiked(false)
    }


    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true)
        else setLiked(false)
    }, [uid, post.likers, liked])

    
  return (
    <div className="like-container">
        
        {
        // Si l'uid est inexistant, on fait apparaitre le popup ( option de react js popup )
        uid === null && (
            <Popup trigger= {<img src="./img/icons/heart.svg" alt="like" />} position= {
                ['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick >
                    <div>Vous devez être connecté pour liker un post</div>
            </Popup> 
        )}
        {
        // Si l'uid existe et que liked est toujours false, le bouton de like est affiché
        uid && liked === false && (
            <img src="./img/icons/heart.svg" onClick={like} alt="like"/>
        )}

        {
        // Dans le cas contraire, c'est le bouton de dislike
        uid && liked && (
            <img src="./img/icons/heart-filled.svg" onClick={unLike} alt="unLike" />
        )}
        <span>{post.likers.length}</span>
    </div>
  )
}
