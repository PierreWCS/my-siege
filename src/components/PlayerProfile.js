import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrosshairs,
  faSkullCrossbones
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import "./PlayerProfile.css";
import ranks from "./datas/ranks";
import op from "./datas/operators";
import RanksBySeason from "./RanksBySeason";

const PlayerStats = player => {
  const [playerProfile, setPlayerProile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [operators, setOperators] = useState(null);
  const [favDefender, setFavDefender] = useState(null);
  const [favAttacker, setFavAttacker] = useState(null);
  const [favoriteOperator, setFavoriteOperator] = useState(null);
  const [operatorInfo, setOperatorInfo] = useState(null);

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
        console.log(operatorsData);

        // Taking favorite attacker and defender
        setFavAttacker(playerData.favattacker);
        setFavDefender(playerData.favdefender);

        let keysAndValues = operatorsData.map(element => {
          return Object.entries(element);
        });

        let stockAttackerStats = keysAndValues.map(element => {
          return element.find(a => a[0] === playerData.favattacker);
        });
        let attackerStats = op.find(a => a.id === stockAttackerStats[0][0]);
        stockAttackerStats.push(attackerStats);
        setFavAttacker(stockAttackerStats);
        console.log(stockAttackerStats);

        let stockDefenderStats = keysAndValues.map(element => {
          return element.find(a => a[0] === playerData.favdefender);
        });
        let defenderStats = op.find(a => a.id === stockDefenderStats[0][0]);
        stockDefenderStats.push(defenderStats);
        setFavDefender(stockDefenderStats);

        console.log(stockDefenderStats[5].Operator);

        let kills = keysAndValues[2];

        // Finding the player's favorite operator by the selector: Max kills
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
        setFavoriteOperator(favoriteOperatorResult);

        // Getting the operator's data in the JSON
        let opStats = op.find(a => a.id === favoriteOperatorResult[0][0]);
        console.log(opStats.Operator);
        setOperatorInfo(opStats);
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

          <div className="rankedStatsContainer">
            <RanksBySeason playerProfile={playerProfile} />
            <div className="rankedStatsSection">
              <h1 className="titleSection">Current season ranked stats</h1>
              <h4>General ranked KD: {playerProfile.kd / 100}</h4>
              <div className="statsRankedSmallContainer">
                <p className="smallStatsItem">
                  Kills: {playerProfile.ranked.EU_kills}
                </p>
                <p className="smallStatsItem">
                  Deaths: {playerProfile.ranked.EU_deaths}
                </p>
              </div>
              <div className="statsRankedSmallContainer">
                <p className="smallStatsItem">
                  Wins: {playerProfile.ranked.EU_wins}
                </p>
                <p className="smallStatsItem">
                  Losses: {playerProfile.ranked.EU_losses}
                </p>
              </div>

              {/*       Player's favorite attacker and defender       */}

              {/*       Favorite attacker     */}

              <div className="favoriteOperators">
                <div className="favoriteAttacker">
                  <h2 className="titleFavoriteOperator">Favorite attacker: {favAttacker[5].Operator}</h2>
                  <img
                    className="favoriteOperatorImage"
                    src={`https://r6tab.com/images/operators/${favAttacker[5].id.replace(
                      ":",
                      "-"
                    )}.png?`}
                    alt="favorite operator"
                  />
                  <p className="favoriteOperator">
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      className="iconKillsDeaths fa-2x"
                    />{" "}
                    : {favAttacker[2][1]}
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      className="iconKillsDeaths fa-2x"
                    />{" "}
                    {favAttacker[3][1]}
                  </p>
                  <p>
                    Ratio :{" "}
                    {Math.round(
                      (favAttacker[2][1] / favAttacker[3][1]) * 100
                    ) / 100}
                  </p>
                </div>

                {/*       Favorite defender       */}

                <div className="favoriteDefender">
                  <h2 className="titleFavoriteOperator">Favorite defender {favDefender[5].Operator}</h2>
                  <img
                    className="favoriteOperatorImage"
                    src={`https://r6tab.com/images/operators/${favDefender[5].id.replace(
                      ":",
                      "-"
                    )}.png?`}
                    alt="favorite operator"
                  />
                  <p className="favoriteOperator">
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      className="iconKillsDeaths fa-2x"
                    />{" "}
                    : {favDefender[2][1]}
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      className="iconKillsDeaths fa-2x"
                    />{" "}
                    {favDefender[3][1]}
                  </p>
                  <p>
                    Ratio :{" "}
                    {Math.round(
                      (favDefender[2][1] / favDefender[3][1]) * 100
                    ) / 100}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlayerStats;
