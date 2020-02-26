import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import './R6stats.css';
import axios from "axios";
import PlayerProfile from "./PlayerProfile";

const R6stats = () => {
  const [playersProposition, setPlayersProposition] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [playerSelected, setPlayerSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setPlayerName(event.target.value);
  };

  const getPlayerStats = () => {
    if (playerName && playerName.length > 3) {
      setLoading(true);
      let apiUrl = `https://r6tab.com/api/search.php?platform=uplay&search=${playerName}`;
      axios.get(apiUrl)
        .then(result => result.data)
        .then(data => {
          console.log(data);
          let players = data.results;
          if (players) {
            if (players.length < 15) {
              setPlayersProposition(players);
              setLoading(false)
            }
          }
        })
    }
  };
  useEffect(() => {
    getPlayerStats();
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
        {
          playerSelected ?
            <PlayerProfile
              player={playerSelected}
              setPlayer={setPlayerSelected}
            />
            :
            <label className="searchPlayerContainerLabel" htmlFor="playerName">
              <h1>Search a player</h1>
              <div className="inputAndButtonSearchPlayer">
                <div className="inputAndButtonRow">
                  <input onChange={handleChange} placeholder="Player name ..." className="searchPlayerInput" type="text"
                         id="playerName"/>
                </div>
                {
                  playersProposition ?
                    <div className="propositionPlayerSearchContainer">
                      {playersProposition.map((player) => {
                        return (
                          <div className="playerCard" onClick={() => {
                            setPlayerSelected(player);
                          }}>
                            <img className="playerImage"
                                 src={`https://ubisoft-avatars.akamaized.net/${player.p_user}/default_146_146.png`}
                                 alt="player image"/>
                            <h3 style={{color: 'white'}}>{player.p_name}</h3>
                            <h3 style={{color: 'white'}}>lvl. {player.p_level}</h3>
                          </div>
                        )
                      })}
                    </div>
                    : null
                }
              </div>
            </label>
        }
        {
          loading ?
            <img src={require('./images/logoSiege.png')} alt="loading ..." className='loadingImage'/>
            : null
        }
      </div>
    </div>
  )
};

export default R6stats;
