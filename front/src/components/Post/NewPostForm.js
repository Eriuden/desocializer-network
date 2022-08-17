import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getPosts } from '../../actions/post.actions'
import { isEmpty, timeStampParser } from '../Utils'

export default function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState(null)
    const [video, setVideo] = useState("")
    const[file, setFile] = useState()
    const userData= useSelector((state) => state.userReducer)
    const errors = useSelector((state) => state.errorReducer.postError)
    const dispatch = useDispatch()

    //Vu qu'on a pas besoin d'importer des éléments de posts (au contraire, on exporte) pas besoin du postreducer

    //Url est natif, idem pour createObjectUrl
    //On appelle les trois fonctions pour mettre autre chose que du texte

    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo('')
    }

    //Quelque soit le contenu
    // on crée un formData pour le combo clé valeur
    //On lui dit ce qui doit être chargé en fonction de la dite clé
    

    const handlePost = () => {
        async () => {
            if (message || picture || video) {
              const data = new FormData()
              data.append('posterId', userData._id)  
              data.append('message', message)
              if (file)data.append("file", file)
              data.append('video', video)
              
              await dispatch(addPost(data))
              dispatch(getPosts())
              cancelPost()
              
            } else {
              alert("veuillez entrer un message")
            }

        }
    }

    //On boucle pour chaque lien trouvé, si le lien inclus l'url d'une vidéo youtube
    //On modifie l'url pour y rajouter des information nécessaires au visionnage depuis le post
    //Comme dirait OSS117 , c'est un bordel (donc on va s'en tenir à cette formule, car putain qu'elle est illisible)

    const handlevideo = () => {
        let findLink = message.split(" ")
        for(let i =0; i< findLink; i++) {
            if(findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout') ) {
                let embed = findLink[i].replace('watch?v=', "embed/")
                setVideo(embed.split('&')[0])
                findLink.splice(i, 1)
                setMessage(findLink.join(" "))
                setPicture('')
            }
        }
    }

    //On remet la valeur du contenu en vide

    const cancelPost = () => {
        setMessage("")
        setPicture("")
        setVideo("")
        setFile("")
    }

    //Si l'userData existe, on arrête de charger et on lance handleVideo

    useEffect(() => {
        if (!isEmpty(userData)) 
            setIsLoading(false)
            handlevideo()
    }, [userData, message, video])

  return (
    <div className='post-container'>
        {isLoading ? (
            <i className='fas fa-spinner fa-pulse'></i>
        ) : (
            <>
                <div className="data">
                    <p>
                        <span>{// Dans les deux cas, si il y a du follow, on en met le nombre, sinon 0
                                userData.following ? userData.following.length : 0}</span>{" "}
                        <span>Abonnements:</span>
                    </p>

                    <p>
                        <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
                        <span>Abonnés:</span>
                    </p>
                
                </div>

                <Link to={"/profil"}>
                    <div className="user-info">
                        <img src={userData.picture} alt="user-img" />
                    </div>
                </Link>
                <div className="post-form">
                    <textarea name="message" id="message" 
                    placeholder='Quoi de neuf' 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message} 
                    />
                    {message || picture || video.length > 20 ? (
                        <li className="card-container">
                            <div className="card-left">
                                <img src={userData.picture} alt="user-pic" />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <span>{timeStampParser(date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={picture} alt="" />
                                    {video && (
                                        <iframe
                                        src={video}
                                        frameBorder="0"
                                        allow='accelerometer; autoplay; clipboard-write;
                                        encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                        title={video}></iframe>
                                    )}
                                </div>
                            </div>
                        </li>
                    ) : null}
                
                    <div className="footer-form">
                        <div className="icon">
                            {isEmpty(video) && (
                                <>
                                <img src="./img/icons/picture.svg" alt="img" />
                                <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg .png /"
                                onChange={(e) => handlePicture(e)} />
                                </>
                            )}
                            {video && (
                                <button onClick={() => setVideo("")}>Supprimer la vidéo</button>
                            )}
                        </div>
                        {!isEmpty(errors.format) && <p>{errors.format}</p>}
                        {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}

                        <div className="btn-send">
                            {message || picture ||video.length > 20 ? (
                                <button className='cancel' onClick={cancelPost}>Annuler message</button>
                            ) : null}

                            <button className='send' onClick={handlePost}>Envoyer</button>
                            
                            
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
    
  )
}
