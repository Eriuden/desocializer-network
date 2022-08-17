import React from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import FriendHint from "../components/Profil/FriendHint";
import { useContext } from "react";

export default function Home() {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? ( // si il est co, on lui propose un form de création de post
            //sinon, on lui propose de se co, mais pas de s'inscrire
            <NewPostForm />
          ) : (
            <Log signin={true} signup={false} />
          )}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendHint />}
          </div>
        </div>
      </div>
    </div>
  );
}
