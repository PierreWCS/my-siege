import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./PlayerProfile.css";
import ranks from "./datas/ranks";
import op from "./datas/operators";
import OverviewRanked from "./OverviewRanked";
import OperatorStats from "./OperatorsStats";

const PlayerStats = player => {
  const [playerProfile, setPlayerProile] = useState(null);
  const [operators, setOperators] = useState(null);
  const [favDefender, setFavDefender] = useState(null);
  const [favAttacker, setFavAttacker] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    let apiUrl = `https://r6tab.com/api/player.php?p_id=${player.player.p_id}`;

    // Fetch player data
    Axios.get(apiUrl)
      .then(result => result.data)
      .then(data => {
        console.log(data);
        let playerData = data;
        let operatorsData = JSON.parse(data.operators);

        // Taking favorite attacker and defender
        setFavAttacker(playerData.favattacker);
        setFavDefender(playerData.favdefender);

        let keysAndValues = operatorsData.map(element => {
          return Object.entries(element);
        });

        // Creating array of operators
        let obj = {};

        const statsName = ["wins", "losses", "kills", "deaths", "time_played"];

        keysAndValues.forEach((currentTab, index) => {
          currentTab.forEach(operatorValue => {
            const [key, value] = operatorValue;
            if (Object.keys(obj).includes(key)) {
              obj[key].push([ statsName[index], value]);
            } else {
              obj[key] = [[statsName[index], value]];
            }
          });
        });

        console.log(obj);
        setOperators(obj);

        // Searching the favorite attacker

        let stockAttackerStats = keysAndValues.map(element => {
          return element.find(a => a[0] === playerData.favattacker);
        });
        let attackerStats = op.find(a => a.id === stockAttackerStats[0][0]);
        stockAttackerStats.push(attackerStats);
        setFavAttacker(stockAttackerStats);

        // Searching the favorite defender

        let stockDefenderStats = keysAndValues.map(element => {
          return element.find(a => a[0] === playerData.favdefender);
        });
        let defenderStats = op.find(a => a.id === stockDefenderStats[0][0]);
        stockDefenderStats.push(defenderStats);
        setFavDefender(stockDefenderStats);

        // Finding the player's favorite operator by the selector: Max kills
        let kills = keysAndValues[2];

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

        // Getting all the stats about this operator in the request
        let favoriteOperatorResult = keysAndValues.map(element => {
          return element.find(a => a[0] === favoriteKillsOperator[0]);
        });

        // Getting the operator's data in the JSON
        let opStats = op.find(a => a.id === favoriteOperatorResult[0][0]);
        console.log(opStats.Operator);
        setPlayerProile(playerData);
      });
  };

  return (
    <div className="playerStatsInfoContainer">
      {/*       Overview      */}

      {playerProfile ? (
        <div className="statsMainContainer">
          <div className="imgNameAndLvl">
            {/*   Image name and Lvl    */}

            <div className="imgNameLvlContainer">
              <img
                className="playerImageStats"
                src={`https://ubisoft-avatars.akamaized.net/${playerProfile.p_user}/default_146_146.png`}
                alt="player profile"
              />
              <div className="nameAndLvl">
                <h1 style={{ color: "white" }}>{playerProfile.p_name}</h1>
                <h4 style={{ color: "white" }}>
                  Level {playerProfile.p_level}
                </h4>
              </div>
            </div>

            {/*     Actual MMR      */}

            <div>
              <h2 style={{ color: "white", margin: 0 }}>
                {ranks[playerProfile.p_currentrank + 2].name}
              </h2>
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
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "white", margin: 0 }}>
                  Current MMR {playerProfile.p_currentmmr}
                </h3>
              </div>
            </div>
          </div>

          {/*       Ranked section     */}

          <OverviewRanked
            playerProfile={playerProfile}
            favAttacker={favAttacker}
            favDefender={favDefender}
          />
          <OperatorStats operators={operators} />
        </div>
      ) : null}
    </div>
  );
};

export default PlayerStats;
