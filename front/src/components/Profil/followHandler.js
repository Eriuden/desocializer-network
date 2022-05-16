import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user.actions'
import { isEmpty } from '../Utils'

export default function FollowHandler( { idToFollow, type }) {
  const userData = useSelector((state) => state.userReducer)
  const [isFollowed, setIsFollowed] =useState(false)
  const dispatch = useDispatch()

  //écritures quasi identiques car on doit juste appeller l'action requise, et que l'un fait suivre, donc rend true, alors que l'autre remet l'état d'origine
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(false)
  }

  useEffect(() => {
    //Si le follow de la personne est vide, alors on enchaine 
    //et si le follow includ une id, alors on est abo, félicitation
    if (isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true)
      } else setIsFollowed(false)
    }
  }, [userData], idToFollow)
  
  return (

    <>

    {/*
      Si le compte est follow et que ses données ne sont pas vides
      On a le bouton d'unFollow et une notif qu'on est abo
    */
      isFollowed && !isEmpty(userData) && (
      <span onClick={handleUnfollow}>
        {type === "suggestion" && <button className='unfollow-btn'>Abonné</button>}
        {type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
      </span>
    )}

    {/*
      Si on ne follow pas le compte, le reste, même logique
    */  
      isFollowed === false &&  !isEmpty(userData) && (
      <span onClick={handleFollow}>
      {type === "suggestion" && <button className='follow-btn'>S'abonner</button>}
      {type === "card" && <img src="./img/icons/check.svg" alt="checked" />}
    </span>
    )}

    </>
  )
}
