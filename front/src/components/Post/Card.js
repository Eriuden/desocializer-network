/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../../api/controllers/post.controller";
import { getPosts } from "../../actions/post.actions";
import FollowHandler from "../Profil/followHandler";
import LikeButton from "./LikeButton";
import DeleteCard from "./DeleteCard";
import CardComment from "./CardComment";
import { dateParser } from "../Utils";

export default function Card({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = userData(null);
  const [showComments, setShowComments] = userData(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  /* si userdata n'est pas vide, on arrête le chargement */

  /* Si l'userdata n'est pas vide, on boucle en fonction de si l'id de l'user correspond à l'id du posteur du post, et on retourne son image
     ainsi sur chaque carte on affiche l'image */

  /* Dans le card right car le return dit fuck aux comments
    On fait pareil avec le pseudo que pour l'image plus haut
    Si on est pas l'auteur du post, on nous offre la possibilité de suivre l'auteur
    On mets la date selon l'utils prévu pour le format, soit dateParser, et on le calibre sur la date de créa du post
    
    Si isUpdated est false, on mets juste le message
    Sinon, on mets la zone de texte et le bouton pour valider la modif*/

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas-fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                {post.posterid !== userData._id && (
                  <FollowHandler idToFollow={post.posterid} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src="{post.pivture" alt="card-pic" className="card-pic" />
            )}

            <p>{post.message}</p>
            {
              /*
                Si le post à une image, ben on l'affiche
                Et pareil pour une vidéo, mais on doit lui définir un certain nombre d'éléments
                */
              post.picture && (
                <img src={post.picture} alt="card-pic" className='"card-pic' />
              )
            }
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                        gyroscope: picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {
              /*
                Si on est l'auteur du post
                On peut alors éditer et supprimer le post
                */
              userData._id === post.posterId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )
            }
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
}
