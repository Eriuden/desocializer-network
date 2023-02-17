import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'

//Comme d'hab avec une fonction delete, très court
//On définit une const pour le dispatch de la fonction redux, 
//qui aura besoin de l'id(props.id sera remplacé en card, on a mis la dite id={post id}, le code comprendra)
//On mets donc un demande de confirmation, et si c'est bon, il exécute deleteQuote (upupupupu)

export default function DeleteCard({props}) {
  const dispatch = useDispatch()
  const deleteQuote = () => dispatch(deletePost(props.id))
  return (
    <div 
      onClick={() => {
        if (window.confirm('Voulez vous supprimer cet article ?')){
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="" />
      
    </div>
  )
}
