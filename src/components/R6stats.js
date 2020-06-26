import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./R6stats.css";
import axios from "axios";
import PlayerProfile from "./PlayerProfile";

const R6stats = () => {
  const [playersProposition, setPlayersProposition] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [playerSelected, setPlayerSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setPlayerName(event.target.value);
  };

  const getPlayerStats = () => {
    if (playerName && playerName.length > 3) {
      setLoading(true);
      let apiUrl = `https://r6stats.com/api/player-search/${playerName}/pc`;
      axios({
        method: "get",
        url: apiUrl
      })
        .then(result => result.data)
        .then(data => {
          let players = data;
          if (players) {
            if (players.length < 15) {
              setPlayersProposition(players);
              setLoading(false);
            }
          }
        });
    }
  };
  useEffect(() => {
    getPlayerStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerName]);

  return (
    <div className="r6statsMainContainer">
      <div className="r6statsSearchPlayerContainer">
        <FontAwesomeIcon
          icon={faSearch}
          className="searchIcon fa-3x"
          onClick={() => {
            setPlayerSelected(null);
            setPlayersProposition(null);
          }}
        />
        <p className="newSearchText">New search</p>
        {playerSelected ? (
          <PlayerProfile
            player={playerSelected}
            setPlayer={setPlayerSelected}
          />
        ) : (
          <label className="searchPlayerContainerLabel" htmlFor="playerName">
            <h1>Type the name of your target</h1>
            <div className="inputAndButtonSearchPlayer">
              <div className="inputAndButtonRow">
                <input
                  onChange={handleChange}
                  placeholder="Player name ..."
                  className="searchPlayerInput"
                  type="text"
                  id="playerName"
                />
              </div>
              {playersProposition ? (
                <div className="propositionPlayerSearchContainer">
                  {playersProposition.map((player, key) => {
                    return (
                      <div
                        key={key}
                        className="playerCard"
                        onClick={() => {
                          setPlayerSelected(player);
                        }}
                      >
                        <img
                          className="playerImage"
                          src={player.avatar_url_256}
                          alt="player"
                        />
                        <h3 style={{ color: "white" }}>{player.username}</h3>
                        <h3 style={{ color: "white" }}>
                          lvl.{" "}
                          {player.progressionStats
                            ? player.progressionStats.level
                            : null}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </label>
        )}
        {loading ? (
          <img
            // eslint-disable-next-line no-undef
            src={require("./images/logoSiege.png")}
            alt="loading ..."
            className="loadingImage"
          />
        ) : null}
      </div>
    </div>
  );
};

export default R6stats;
