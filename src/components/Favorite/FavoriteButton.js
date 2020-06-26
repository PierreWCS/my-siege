import React, { useEffect, useState } from "react";
import "./FavoriteButton.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteButton = ({ playerProfile }) => {
  const [playerFavoriteProfiles, setPlayerFavoriteProfiles] = useState(null);
  const [inFavorite, setInFavorite] = useState(false);

  useEffect(() => {
    getLocalSave();
  }, []);

  const getLocalSave = () => {
    let stockFav = JSON.parse(localStorage.getItem("favoriteProfiles"));
    setPlayerFavoriteProfiles(stockFav);
    stockFav.map(profile => {
      if (profile.username === playerProfile.username) {
        setInFavorite(true);
        return 1;
      } else return 0;
    });
  };

  const updateLocalSave = profile => {
    localStorage.setItem("favoriteProfiles", JSON.stringify(profile));
  };

  const addToFavorite = playerProfile => {
    if (playerFavoriteProfiles) {
      let stockLocal = [...playerFavoriteProfiles];
      stockLocal.push(playerProfile);
      updateLocalSave(stockLocal);
      setInFavorite(true);
    } else {
      let stockFav = [];
      stockFav.push(playerProfile);
      updateLocalSave(stockFav);
      setInFavorite(true);
    }
  };

  const deleteFromFavorite = function(playerProfile) {
    let stockFav = playerFavoriteProfiles;
    console.log(stockFav);
    for (let i = 0; i < stockFav.length; i++) {
      if (stockFav[i].username === playerProfile.username) {
        stockFav.splice(i, 1);
        localStorage.setItem("favoriteProfiles", JSON.stringify(stockFav));
        setInFavorite(false);
      }
    }
  };

  return (
    <button
      className="addToFavoriteButton"
      onClick={() => {
        if (inFavorite) {
          deleteFromFavorite(playerProfile);
        } else addToFavorite(playerProfile);
      }}
    >
      {inFavorite ? "Remove to favorite" : "Add to favorite"}
      <FontAwesomeIcon icon={faStar} className="iconFavoriteButton" />
    </button>
  );
};

export default FavoriteButton;
