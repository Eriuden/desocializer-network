/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Post/Card";

export default function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    //première partie: notre position actuelle
    //seconde: la taille actuelle du contenu
    //donc si notre position dépasse la taille du contenue
    //on charge la suite de ce dernier
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    //si loadpost est true, donc, si le contenu est chargé
    //on prend cinq posts (cont fait ici 5)
    //on demande de ne plus charger, du moins pour l'instant
    // mais on rajoute 5 à count pour laisser en place les anciens
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount((prevCount) => setCount(prevCount + 5));
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
}
