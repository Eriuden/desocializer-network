/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import { Link } from "react-router-dom";

export default function Trends() {
  const posts = useSelector((state) => state.allPostReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      //sort permet de trier un array, il prends toujours deux params, d'ou le a et b
      //Ici donc, on cherche à trier les likers
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);
  return (
    <div className="trending-container">
      <h4>Tendances</h4>
      <Link to={"/trending"}>
        <ul>
          {
            /*
                Pour chaque élément de la trend (tendance)
                On renvoie l'id du post en question
                Puis si il y a une image ou une vidéo, la balise HTML
                Et si il y a aucun des deux, on met l'array sur 0(l'image par défaut), puis on map sur l'user
                Et si l'id de l'itération ne correspond pas à l'id du posteur, on renverra null, mais sinon on renvoie l'image de l'user
                */ trendList.length &&
              trendList.map((post) => {
                return (
                  <li key={post._id}>
                    <div>
                      {post.picture && (
                        <img src={post.picture} alt="post-pic" />
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope: picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                      {isEmpty(post.picture) && isEmpty(post.video) && (
                        <img
                          src={
                            usersData[0] &&
                            usersData
                              .map((user) => {
                                if (user._id === post.posterId) {
                                  return user.picture;
                                } else return null;
                              })
                              .join("")
                          }
                          alt="photoProfil"
                        />
                      )}
                    </div>
                    <div className="trend-content">
                      <p>{post.message}</p>
                      <span>Lire</span>
                    </div>
                  </li>
                );
              })
          }
        </ul>
      </Link>
    </div>
  );
}
