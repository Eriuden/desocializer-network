import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, getPosts } from '../../actions/post.actions'
import FollowHandler from '../Profil/followHandler'
import { isEmpty, timeStampParser } from '../Utils'
import EditDeleteComment from './EditDeleteComment'

export default function CardComment() {
    const [text, setText] = useState('')
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    /*
    La fonction appellée sur le bouton de postage de commentaire
    On dispatch sur l'action redux d'addComment, et on lui donne en params les éléments pour créer le comm
    Puis en promesse on lit le post, le text("") c'ets car il va s'adapter à ce que l'on écrit plus bas avec le onChange
    */ 
    const handleComment = (e) => {
        e.prevenDefault()

        if(text) {
            dispatch(addComment(post._id, userData._id,text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""))
        }
    }
  return (
    <div className="comments-container">
        {post.comments.map((comment) => {
            return(
                <div className = {comment.commenterId === userData._id ?
                "comment-container client" : "comment-container"} key ={comment._id}> 
                    <div className="left-part">
                        <img src={!isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                                if(user._id === comment.commenterId) return user.picture
                                else return null
                            })
                            .join("")
                        } alt="commenter-pic" />
                    </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== userData._id && (
                                        <FollowHandler idToFollow={comment.commenterId} />
                                    )}       
                                </div>
                                <span>{timeStampParser(comment.timeStamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                </div>
            )
        })}
        {
        /*
        Le formulaire qui permet d'envoyer le commentaire
        */
        userData._id && (
            <form action="" onSubmit={{handleComment}} className="comment-form">
                <input type="text" name="text" onChange={(e) => setText(e.target.value)}
                value={text} placeholder="laisser un commentaire" />
                <br />
                <input type="submit" value= "Envoyer" />
            </form>
        )}
    </div>
  )
}
