import React, { useEffect, useState } from "react";
import "./FavoriteProfile.css";

const FavoriteProfile = () => {
  const [favoriteProfiles, setFavoriteProfiles] = useState(null);
  useEffect(() => {
    getLocalSave();
  }, []);

  const getLocalSave = () => {
    let stockFav = JSON.parse(localStorage.getItem("favoriteProfiles"));
    setFavoriteProfiles(stockFav);
    console.log(stockFav);
  };

  return (
    <div className="favoritePlayersContainer">
      {favoriteProfiles && favoriteProfiles[0] !== null
        ? favoriteProfiles.map((player, key) => {
            return (
              <div key={key}>
                <img
                  className="playerImageStats imageFavorite"
                  src={`https://ubisoft-avatars.akamaized.net/${player.p_user}/default_146_146.png`}
                  alt="player profile"
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FavoriteProfile;
