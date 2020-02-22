import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './PlayerProfile.css';
import ranks from './datas/ranks';
import RanksBySeason from "./RanksBySeason";

const PlayerStats = ( player ) => {
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
              <img className="playerImageStats" src={`https://ubisoft-avatars.akamaized.net/${playerProfile.p_user}/default_146_146.png`} alt="player image"/>
              <div className="nameAndLvl">
                <h1 style={{ color: 'white' }}>{playerProfile.p_name}</h1>
                <h4 style={{ color: 'white' }}>Level {playerProfile.p_level}</h4>
              </div>
            </div>
            <div>
              <h4>General KD {playerProfile.kd / 100}</h4>
            </div>
            <div className="rankedStats">
              <h3>Current MMR {playerProfile.p_currentmmr}</h3>
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
