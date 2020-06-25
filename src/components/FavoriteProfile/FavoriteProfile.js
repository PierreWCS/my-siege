import React, { useEffect, useState } from "react";
import "./FavoriteProfile.css";
import PlayerProfile from "../PlayerProfile";

const FavoriteProfile = () => {
  const [favoriteProfiles, setFavoriteProfiles] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
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
      {
        selectedProfile ?
              <PlayerProfile
                player={selectedProfile}
              />
              : null
      }
      {favoriteProfiles && favoriteProfiles[0] !== null
        ? favoriteProfiles.map((player, key) => {
            return (
              <div className="favoriteProfileCard" key={key} onClick={() => setSelectedProfile(player)}>
                <p className="playerNameFavoriteProfile">{player.p_name}</p>
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
