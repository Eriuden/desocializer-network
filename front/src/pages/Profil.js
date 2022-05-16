import React, { useContext } from 'react'
import IndexLog from '../components/Log/IndexLog'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/Profil/UpdateProfil'

export default function Profil() {
  const uid = useContext(UidContext)
  return (
    <div className='profil-page'>
      {uid ? (
        <UpdateProfil/>
      ) : (
      <div className="log-container">
          <IndexLog signin= {false} signup={true} />
          <div className="img-container">
              <img src='../../public/img/log.svg' alt="l'image de log" />
          </div>
      </div>
      )}
    </div>
  )
}
