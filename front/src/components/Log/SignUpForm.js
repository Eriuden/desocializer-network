import axios from 'axios'
import React, { useState } from 'react'
import SignInForm from './SignInForm'

export default function SignUpForm() {
  const [formSubmit, setFormSubmit] = useState(false)
  const [pseudo, setPseudo] =useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordControl, setPasswordControl] = useState('')

  const handleRegister = async (e) => {
    e.prevendDefault();
    const terms = document.getElementById('terms')
    const pseudoError = document.querySelector('.pseudo.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfError = document.querySelector('.password-conf.error')
    const termsError = document.querySelector('.terms.error')

    passwordConfError.innerHTML=""
    termsError.innerHTML=""

    /* Celui là est dix fois plus long, car il ne s'agit pas de demander deux trois trucs, mais une masse
    Si le password ne correspond pas au veuillez confirmer votre mot de passe, alors on écrit ça dans l'erreur et on ne va pas plus loin
    Idem si les conditions générales ne sont pas checkées (note: ca semble être un attribut natif des checkbox)*/

    if (password !== passwordControl || password.length <8 || !terms.checked) {
      if(password !== passwordControl){
        passwordConfError.innerHTML ="les mots de passe ne correspondent pas"
      }

      if(password.length < 8) {
        passwordError.innerHTML="Mot de passe trop court, minimum 8 caractères"
      }
      
      if (!terms.checked){
        termsError.innerHTML = "veuillez valider les conditions générales"
      }
    /*Si tout va bien donc 
    on appelle la route de register, comme on crée un truc, c'est du post
    On passe dans les données ce dont on aura besoin, soit son pseudo, son mail et son password
    En promesse, on va d'abord voir si il n'y a toujours pas d'erreur
    Et si tout est bon, on passe le formsubmit en true, ce qui valide l'inscription et fait apparaitre le formulaire de co
    */
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password
        }
      })
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password
        } else {
          setFormSubmit(true)
        }
      })
      .catch((err) => console.log(err))
    }
  }
  return (
    <>
      {formSubmit /*Si formSubmit est true, on fait apparaitre ce message, sinon, on envoie le formulaire d'inscription*/? (
        <> 
        <h4 className='="success'> Inscription réussie, veuillez vous connecter</h4>
        <SignInForm />
        </> 
      ) : (
        <form action ="" onSubmit={handleRegister}> 


          <label htmlFor='pseudo'></label>
          <input type="text" name="pseudo" id="pseudo" value={pseudo}
          onChange={(e) =>setPseudo(e.target.value)} />
          <div className="pseudo error"></div>

          <label htmlFor='email'></label>
          <input type="text" name="email" id="email" value={email}
          onChange={(e) =>setEmail(e.target.value)} />
          <div className="email error"></div>

          <label htmlFor='password'></label>
          <input type="password" name="password" id="password" value={password}
          onChange={(e) =>setPassword(e.target.value)} />
          <div className="password error"></div>


          <label htmlFor='password-conf'>Confirmer Mot de passe</label>
          <input type="password" name="password" id="password-conf" value={passwordControl}
          onChange={(e) =>setPasswordControl(e.target.value)} />
          <div className="password-conf error"></div>

          <input type="checkbox" id="terms" />
          <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
          <div className="terms error"></div>
          
          <input type="submit" value ="inscription" />
        </form>
      )}
    </>
  )
}
