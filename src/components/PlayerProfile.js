import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCrosshairs, faSkullCrossbones} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import './PlayerProfile.css';
import ranks from './datas/ranks';
import op from './datas/operators';
import RanksBySeason from "./RanksBySeason";

const PlayerStats = (player, setPlayer) => {
  const [playerProfile, setPlayerProile] = useState(null);
  const [operators, setOperators] = useState(null);
  const [favoriteOperator, setFavoriteOperator] = useState(null);
  const [operatorInfo, setOperatorInfo] = useState(null);

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
        let operatorsData = JSON.parse(data.operators);

        let keysAndValues = operatorsData.map((element) => {
          return Object.entries(element);
        });

        let wins = keysAndValues[0];
        let losses = keysAndValues[1];
        let kills = keysAndValues[2];
        let timePlayed = keysAndValues[3];

        console.log(kills);
        let counter = 0;
        let favoriteKillsOperator = 0;
        for (let i = 0; i < kills.length; i++) {
          if (kills[i][1] > counter) {
            counter = kills[i][1];
            favoriteKillsOperator = kills[i];
          } else {
            console.log("plus petit");
          }
        }

        let favoriteOperatorResult = keysAndValues.map((element) => {
          return element.find(a => a[0] === favoriteKillsOperator[0]);
        });
        console.log(favoriteOperatorResult);
        setFavoriteOperator(favoriteOperatorResult);
        // console.log("Operator wins :" + favoriteOperatorResult[0][1]);
        // console.log("Operator losses :" + favoriteOperatorResult[1][1]);
        // console.log("Operator kills :" + favoriteOperatorResult[2][1]);
        // console.log("Operator deaths :" + favoriteOperatorResult[3][1]);
        // console.log("Operator time :" + favoriteOperatorResult[4][1]);

        //      Search deaths with the key

        let opStats = op.find(a => a.id === favoriteOperatorResult[0][0]);
        console.log(opStats.Operator);
        setOperatorInfo(opStats);
        setOperators(operatorsData);
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
                <img
                  className="playerImageStats"
                  src={`https://ubisoft-avatars.akamaized.net/${playerProfile.p_user}/default_146_146.png`}
                  alt="player profile picture"
                />
                <div className="nameAndLvl">
                  <h1 style={{color: 'white'}}>{playerProfile.p_name}</h1>
                  <h4 style={{color: 'white'}}>Level {playerProfile.p_level}</h4>
                </div>
              </div>

              {/*     Actual MMR      */}

              <div>
                <h2 style={{color: 'white', margin: 0}}>{ranks[playerProfile.p_currentrank + 2].name}</h2>
                <div className="actualRankContainer">
                  <img
                    className="previousRank"
                    src={ranks[playerProfile.p_currentrank + 1].image}
                    alt=""
                  />
                  <img
                    className="actualRank"
                    src={ranks[playerProfile.p_currentrank + 2].image}
                    alt=""
                  />
                  <img
                    className="nextRank"
                    src={ranks[playerProfile.p_currentrank + 3].image}
                    alt=""
                  />
                </div>
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: 'white', margin: 0}}>Current MMR {playerProfile.p_currentmmr}</h3>
                </div>
              </div>
            </div>
            <div className="rankedStatsContainer">
              <RanksBySeason playerProfile={playerProfile}/>
              <div className="rankedStatsSection">
                <h1 className="titleSection">Ranked stats</h1>
                <h4>General ranked KD: {playerProfile.kd / 100}</h4>
                <div className="statsRankedSmallContainer">
                  <p className="smallStatsItem">Kills: {playerProfile.ranked.EU_kills}</p>
                  <p className="smallStatsItem">Deaths: {playerProfile.ranked.EU_deaths}</p>
                </div>
                <div className="statsRankedSmallContainer">
                  <p className="smallStatsItem">Wins: {playerProfile.ranked.EU_wins}</p>
                  <p className="smallStatsItem">Losses: {playerProfile.ranked.EU_losses}</p>
                </div>
                <img src={`https://r6tab.com/images/operators/${favoriteOperator[0][0].replace(':', '-')}.png?`}
                     alt="favorite operator"/>
                <h4>Favorite operator : {operatorInfo.Operator}</h4>
                <p className="favoriteOperator">
                  <FontAwesomeIcon icon={faCrosshairs} className="iconKillsDeaths fa-2x"/> : {favoriteOperator[2][1]}
                  <FontAwesomeIcon icon={faSkullCrossbones} className="iconKillsDeaths fa-2x"/> {favoriteOperator[3][1]}
                </p>
                <p>Ratio : {Math.round(favoriteOperator[2][1] / favoriteOperator[3][1] * 100) / 100}</p>
              </div>
            </div>
          </div>
          :
          null
      }
    </div>
  )
};

export default PlayerStats;
