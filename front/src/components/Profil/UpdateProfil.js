import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBio } from '../../actions/user.actions'
import UploadImg from './UploadImg'
import { dateParser } from '../Utils'
import FollowHandler from './followHandler'

export default function UpdateProfil() {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)

    const userData = useSelector((state) => state.userReducer)
    const usersData = useSelector((state) => state.usersReducer)
    const error = useSelector((state) => state.errorReducer.userError)
    const dispatch = useDispatch

    const [followingPopUp, setFollowingPopUp] = useState=(false)
    const [followersPopUp, setFollowersPopUp] = useState=(false)

    const handleUpdate = () => {
      dispatch(updateBio(userData._id, bio))
      setUpdateForm(false)
    }

    /*Malgré son nom, on est plutôt sur la page de profil utilisateur*/ 

  return (
    <div className="profil-container">

        <leftNav />
        <h1> Profil de {userData.pseudo}</h1>

        <div className="update-container">

            <div className="left-part">
                <h3>Photo de profil</h3>
                <img src={userData.picture} alt="user-pic" />
                <UploadImg />
                <p>{error.maxSize}</p>
                <p>{error.format}</p>
                
            </div>

            <div className="right-part">

              <div className="bio-update">

                <h3>Bio</h3>
                {/* Qu'on clique sur la bio direct ou le bouton, on inverse la valeur de setUpdateForm*/
                  updateForm === false && (
                  <>
                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                    <button onClick={() =>setUpdateForm(!updateForm)}>Modifier bio</button>
                  </>
                )}
                {/*Si updateForm est true, alors on affiche la zone de texte avecle bouton de modif de la bio*/
                  updateForm &&(
                  <>
                    <textarea type="text" defaultValue={userData.bio}onChange={(e) => setBio(e.target.value)}>
                    </textarea>
                    <button onClick={handleUpdate}>Valider la modification</button>
                  </>
                )}

              </div>

              <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                  <h5 onClick={/*On fait apparaitre le pop up des follow/followers*/() => setFollowingPopUp(true)}>Abonnements: {userData.following ? userData.following.length: "0"}</h5>
                  <h5 onClick={() => setFollowersPopUp(true)}>Abonnés : {userData.follwers ? userData.follwers.length: "0"}</h5>

            </div>

        </div>

        {/*
        Les deux pop up sont identiques, sauf bien sur que l'un est following, l'autre followers
        On mets une croix (la suite de caractères en écrit une) qui si l'on clique dessus mets sur false le popup, et donc le ferme
        On map sur les usersData
        Puis on boucle pour affecter chaque itération
        Si l'id de l'itération est le même que l'id d'un de nos abonnements/abonnés
        On retourne plusieurs infos sur lui en HTML
        */
          followingPopUp &&
          <div className='popup-profil-container'>

            <div className='modal'>

              <h3>Abonnements</h3>
              <span className='cross' onClick={setFollowingPopUp(false)}>&#10005;</span>
              <ul>
                {usersData.map((user) => {
                  for (let i = 0; i <userData.following.length; i++) {
                    if(user._id === userData.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt= "user-pic" />
                          <h4>{user.pseudo}</h4>
                          <FollowHandler idToFollow={user._id} type="suggestion"/>
                        </li>
                      )
                    }
                  }
                  return null;
                })}
              </ul>

            </div>  

          </div>
          }

       {followersPopUp &&
          <div className='popup-profil-container'>

            <div className='modal'>

              <h3>Abonnements</h3>
              <span className='cross' onClick={setFollowersPopUp(false)}>&#10005;</span>
              <ul>
                
                {usersData.map((user) => {
                  for (let i = 0; i <userData.followers.length; i++) {
                    if(user._id === userData.followers[i]) {

                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt= "user-pic" />
                          <h4>{user.pseudo}</h4>

                          <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} tpe="suggestion"/>
                          </div>

                        </li>
                      )
                    }
                    
                  }
                  return null;
                })}
              </ul>

            </div>  

          </div>
          }
    </div>
  )
}
