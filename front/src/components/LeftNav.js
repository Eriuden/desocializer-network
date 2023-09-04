import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftNav() {
  return (
    <div className="leftNavContainer">
        <div className="icons">
            <div className="icons-bis">
                <Link to={"/"} className ="active-left-nav">
                    <img src="./img/icons/home.svg" alt="home" />
                </Link>
                <br/>
                <Link to={"/trending"} className ="active-left-nav">
                    <img src="./img/icons/rocket.svg" alt="trending" />
                </Link>
                <br/>
                <Link to={"/profil"} className ="active-left-nav">
                    <img src="./img/icons/user.svg" alt="profil" />
                </Link>
            </div>
        </div>
    </div>
  )
}
