import React from 'react'
import axios from 'axios'
import cookie from "js-cookie"

export default function Logout() {

  /*
  On appelle avec axios, en précisant que c'est un get, la route en back de la fonction de déco
  On retire le cookie de connexion en une milliseconde 
  Puis on précise que la fenètre du navigateur, est désormais sur la page d'acceuil
  */


    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {expires: 1})
        }
    }
    const logout = async () => {
      await axios({
        method: "get",
        url:`${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
      })
        .then(() => removeCookie('jwt'))  
        .catch((err) => console.log(err))

      window.location ="/"
    }

  return (
    <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="icone logout"/>
    </li>
  )
}
