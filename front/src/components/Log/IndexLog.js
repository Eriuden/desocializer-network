import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function IndexLog( props ) {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register"){
        setSignInModal(false)
        setSignUpModal(true)
    } else if(e.target.id === "login") {
        setSignInModal(true)
        setSignUpModal(false)
    }
  }

/* 
En cliquant, handlemodals s'active, et l'id de l'élément ciblé va être vérifié, et donc passé sur true, ce qui va donner la classe active btn
Sinon, c'est null et donc littéralement inexistant
En somme, en cliquant sur s'inscrire, le bouton s'inscrire étant la cible de l'event de handlemodals, il fait passer la valeur
du hook signUpModal à true, or, on a mis en bas, qu'il doit afficher le signUpForm dans le cas où signUpModal est true
même topo pour signInModal bien sur
*/
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li onClick={handleModals} 
            id="register" 
            className={signUpModal ? "active-btn" :null}>S'inscrire</li>
          <li onClick={handleModals} 
            id="login" 
            className={signInModal ? "active-btn" :null}>Se connecter</li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  )
}
