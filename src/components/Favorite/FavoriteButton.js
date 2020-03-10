import React, { useState } from "react";
import "./FavoriteButton.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteButton = ({ playerProfile }) => {
  const getLocalSave = () => {
    return JSON.parse(localStorage.getItem("favoriteProfiles"));
  };

  const updateLocalSave = profile => {
    localStorage.setItem("favoriteProfiles", JSON.stringify(profile));
  };

  const addToFavorite = playerProfile => {
    if (getLocalSave()) {
      let stockLocal = getLocalSave();
      stockLocal.push(playerProfile);
      updateLocalSave(playerProfile);
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
      Add to favorite
      <FontAwesomeIcon icon={faStar} className="iconFavoriteButton" />
    </button>
  );
};

export default FavoriteButton;
