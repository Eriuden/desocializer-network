import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { uploadPicture } from '../../actions/user.actions'

export default function UploadImg() {
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userReducer)

    const handlePicture = (e) => {
        e.preventDefault();
        //Permet de mettre l'image dans un package json avec des information que l'on passe
        const data = new FormData()
        //clé puis valeur, comme d'hab
        data.append("name", userData.pseudo)
        data.append("userId", userData._id)
        data.append("file", file)

        dispatch(uploadPicture(data, userData._id))
    }
    return (
      <form action="" onSubmit={handlePicture} className="upload-pic">
          <label htmlFor='file'>Changer d'image</label>
          <input type="file" 
            id="file" 
            name="file" 
            accept='.jpg, .jpeg, .png' 
            onChange={(e) => setFile(e.target.files[0])}/>
            <br/>
            <input type ="submit" value ="envoyer" />
      
      </form>
  )
}
