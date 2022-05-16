import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../actions/post.actions'
import { UidContext } from '../AppContext'



export default function EditDeleteComment({comment, postId}) {

    const[isAuthor, setIsAuthor] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const handleEdit = (e) => {
        e.preventDefault()

        //Avec useDispatch, on peut accéder a la fonction dispatch de Redux, c'est pourquoi on appelle d'abord la variable où il est contenue
        //Puis l'action , avec en paramètres les éléments postId (le nom de la props lors de l'appel du composant dans CardComment)
        //, pour savoir quel est le post du comment, puis l'id du comment pour le trouver, puis le text pour le modifier
        if(text) {
            dispatch(editComment(postId, comment._id,text))
            setText('')
            setEdit(false)
        }
    }

    //Ici plus besoin du text, on veut détruire le commentaire complet, donc, faut juste le repérer
    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id))
    }

    //Pour placer en true le author, si l'uid correspond à l'id du commentateur du commentaire
    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [uid, comment.commenterId])

    //Si l'author est faux, on affichera rien
    //Au début, l'edit est faux, en cliquant, on fera donc disparaitre le bouton car edit devient true
    //Et à ce moment, le formulaire peut s'afficher

    //On met au début un bouton cliquer change la valeur d'edit, donc faire disparaitre le formulaire
    //On met plus bas une input pour text, ce qui vrée une zone de texte, le onchange avec le reste permet la modification constante
    //Le defautlValue indique la valeur de base, donc, on va prendre le texte de l'objet commentaire

    //Pour la supression, le window.confirm est une méthode native de react permettant une option de confirmation d'action

  return (
    <div className="edit-comment">
        {isAuthor && edit === false && (
            <span onClick={() => setEdit(!edit)}>
                <img src="./img/icons/edit.svg" alt="edit" />
            </span>             
        )}
        {isAuthor && edit && (
            <form action="" onSubmit={handleEdit} className="edit-comment-form">
              <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>  
                <br />
                <input type="text"  name="text" onChange={(e) => setText (e.target.value)}
                defaultValue={comment.text}/>
                <br />
                <div className="btn">
                    <span onClick={() =>{
                        if(window.confirm("voulez vous supprimer ce commentaire ?")) {
                            handleDelete()
                            }
                        }}
                    >
                            <img src="img/icons/trash.svg" alt="" />
                        </span>
                </div>
                <input type="submit" value="valider les modifications" />
            </form>
        )}
    </div>
  )
}
