import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import './PlayerProfile.css';
import ranks from './datas/ranks';
import RanksBySeason from "./RanksBySeason";

const PlayerStats = ( player, setPlayer ) => {
  const [playerProfile, setPlayerProile] = useState(null);

  useEffect(() => {
    fetchProfile()
  }, []);

  const fetchProfile = () => {
    let apiUrl = `https://r6tab.com/api/player.php?p_id=${player.player.p_id}`;
    Axios.get(apiUrl)
      .then(result => result.data)
      .then(data => {
        console.log(data);
        let playerData = data;
        setPlayerProile(playerData);
      })
  };

  return (
    <div className="playerStatsInfoContainer">
      {
        playerProfile ?
          <div className="statsMainContainer">
            <div className="imgNameAndLvl">

              {/*   Image name and Lvl    */}

              <div className="imgNameLvlContainer">
                <img className="playerImageStats" src={`https://ubisoft-avatars.akamaized.net/${playerProfile.p_user}/default_146_146.png`} alt="player image"/>
                <div className="nameAndLvl">
                  <h1 style={{ color: 'white' }}>{playerProfile.p_name}</h1>
                  <h4 style={{ color: 'white' }}>Level {playerProfile.p_level}</h4>
                </div>
              </div>

              {/*     Actual MMR      */}

              <div>
                <div className="actualRankContainer">
                  <img className="previousRank" src={ranks[playerProfile.p_currentrank + 1].image} alt=""/>
                  <img className="actualRank" src={ranks[playerProfile.p_currentrank + 2].image} alt=""/>
                  <img className="nextRank" src={ranks[playerProfile.season15rank + 3].image} alt=""/>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3>Current MMR {playerProfile.p_currentmmr}</h3>
                </div>
              </div>
            </div>
            <div>
              <h4>General KD {playerProfile.kd / 100}</h4>
            </div>
            <RanksBySeason playerProfile={playerProfile} />
          </div>
          :
          null
      }
    </div>
  )
};

export default PlayerStats;
