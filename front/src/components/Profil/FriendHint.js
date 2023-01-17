/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./followHandler";

export default function FriendHint() {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  

  //PlayOnce sera placé en false si ça marche, d'ou son nom
  // Du coup si les données user existent

  useEffect(() => {

    const notFriendList = () => {
      //on boucle sur les userData
      //Si l'id de l'user de l'itération n'est pas celui de l'userData
      // Donc qu'il ne s'agit pas de lui même
      // et que l'on peut trouver l'id de l'userData dans les followers
      // on push l'id dans le tableau, de sorte que l'on propose des gens pas encore en abo
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && user.followers.includes(userData._id)){return array.push(user.id)}
          return user
      });
      // en fonction de la taille de l'écran, les suggestions seront plus ou moins nombreuses
      // le length, encore et toujours, pour quantifier les valeurs d'un tableau
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 2;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
      //On donne à friendHint la valeur de l'array
    };
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].pictures} alt="user-pictures" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            return user
            })}
        </ul>
      )}
    </div>
  );
}
