import React, {useEffect, useState} from "react";
import "./FavoriteButton.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteButton = ({ playerProfile }) => {
  const [playerFavoriteProfiles, setPlayerFavoriteProfiles] = useState(null);

  useEffect(() => {
    getLocalSave();
  }, []);

  const getLocalSave = () => {
    setPlayerFavoriteProfiles(JSON.parse(localStorage.getItem("favoriteProfiles")));
    console.log(JSON.parse(localStorage.getItem("favoriteProfiles")));
  };

  const updateLocalSave = profile => {
    localStorage.setItem("favoriteProfiles", JSON.stringify(profile));
  };

  const addToFavorite = playerProfile => {
    if (playerFavoriteProfiles) {
      let stockLocal = [...playerFavoriteProfiles];
      stockLocal.push(playerProfile);
      updateLocalSave(stockLocal);
    } else {
      let stockFav = [];
      stockFav.push(playerProfile);
      updateLocalSave(stockFav);
    }
  };
    return (
      <button
        className="addToFavoriteButton"
        onClick={() => addToFavorite(playerProfile)}
      >
        Remove to favorite
        <FontAwesomeIcon icon={faStar} className="iconFavoriteButton" />
      </button>
    )
};

export default FavoriteButton;
