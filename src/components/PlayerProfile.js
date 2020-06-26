import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./PlayerProfile.css";
import ranks from "./datas/ranks";
import OverviewRanked from "./OverviewRanked";
import OperatorStats from "./OperatorsStats";
import FavoriteButton from "./Favorite/FavoriteButton";

const PlayerStats = ({ player }) => {
  const [playerProfile, setPlayerProfile] = useState(null);
  const [operators, setOperators] = useState(null);
  const [favDefender, setFavDefender] = useState(null);
  const [favAttacker, setFavAttacker] = useState(null);
  const [page, setPage] = useState("overview");

  const tokenKey = "4743fb05-03b0-42c2-8ef7-8ff263901217";

  useEffect(() => {
    getPlayerStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlayerStats = async function () {
    let stockPlayerData = getPlayerSeasonStats();
    await setPlayerProfile(stockPlayerData);
  };

  const getPlayerSeasonStats = function () {
    console.log(player);
    Axios({
      method: "get",
      url: `https://api2.r6stats.com/public-api/stats/${player.username}/pc/seasonal`,
      headers: { Authorization: tokenKey}
    })
      .then(result => {
        setPlayerProfile(result.data);
        console.log(result.data);
        getPlayerOperatorsStats();
      })
      .catch(error => console.log(error));
  };

  const getPlayerOperatorsStats = () => {
    Axios({
      method: 'get',
      headers: { Authorization: tokenKey },
      url: `https://api2.r6stats.com/public-api/stats/${player.username}/pc/operators`
    })
      .then(result => {
        let requestRes = result.data;
        console.log(requestRes);
        let favoriteDefender = null;
        let currentDefenderKills = 0;
        requestRes.operators.map(operator => {
          if (operator.role === 'Defender' && operator.kills > currentDefenderKills) {
            favoriteDefender = operator;
            currentDefenderKills = operator.kills;
            return 1;
          } else return 0;
        });

        let favoriteAttacker = null;
        let currentAttackerKills = 0;
        requestRes.operators.map(operator => {
          if (operator.role === 'Attacker' && operator.kills > currentAttackerKills) {
            favoriteAttacker = operator;
            currentAttackerKills = operator.kills;
            return 1;
          } else return 0;
        });
        console.log(favoriteAttacker);
        setFavDefender(favoriteDefender);

        console.log(favoriteDefender);
        setFavAttacker(favoriteAttacker);

        setOperators(requestRes);
      })
  };

  // Old API treatment, i wanna keep it because the treatment is interesting

  // const fetchProfile = () => {
  //   let apiUrl = `https://r6tab.com/api/player.php?p_id=${player.p_id}`;
  //
  //   // Fetch player data
  //   Axios.get(apiUrl)
  //     .then(result => result.data)
  //     .then(data => {
  //       console.log(data);
  //       let playerData = data;
  //       let operatorsData = JSON.parse(data.operators);
  //
  //       // Taking favorite attacker and defender
  //       setFavAttacker(playerData.favattacker);
  //       setFavDefender(playerData.favdefender);
  //
  //       let keysAndValues = operatorsData.map(element => {
  //         return Object.entries(element);
  //       });
  //
  //       // Creating array of operators more properly than the API
  //       let obj = {};
  //       const statsName = ["wins", "losses", "kills", "deaths", "time_played"];
  //       keysAndValues.forEach((currentTab, index) => {
  //         currentTab.forEach(operatorValue => {
  //           const [key, value] = operatorValue;
  //           if (Object.keys(obj).includes(key)) {
  //             obj[key].push([statsName[index], value]);
  //           } else {
  //             obj[key] = [[statsName[index], value]];
  //           }
  //         });
  //       });
  //       setOperators(obj);
  //
  //       // Searching the favorite attacker
  //
  //       let stockAttackerStats = keysAndValues.map(element => {
  //         return element.find(a => a[0] === playerData.favattacker);
  //       });
  //       let attackerStats = op.find(a => a.id === stockAttackerStats[0][0]);
  //       stockAttackerStats.push(attackerStats);
  //       setFavAttacker(stockAttackerStats);
  //
  //       // Searching the favorite defender
  //
  //       let stockDefenderStats = keysAndValues.map(element => {
  //         return element.find(a => a[0] === playerData.favdefender);
  //       });
  //       let defenderStats = op.find(a => a.id === stockDefenderStats[0][0]);
  //       stockDefenderStats.push(defenderStats);
  //       setFavDefender(stockDefenderStats);
  //
  //       // Finding the player's favorite operator by the selector: Max kills
  //       let kills = keysAndValues[2];
  //
  //       let counter = 0;
  //       let favoriteKillsOperator = 0;
  //       for (let i = 0; i < kills.length; i++) {
  //         if (kills[i][1] > counter) {
  //           counter = kills[i][1];
  //           favoriteKillsOperator = kills[i];
  //         } else {
  //           console.log("plus petit");
  //         }
  //       }
  //
  //       // Getting all the stats about this operator in the request
  //       let favoriteOperatorResult = keysAndValues.map(element => {
  //         return element.find(a => a[0] === favoriteKillsOperator[0]);
  //       });
  //
  //       // Getting the operator's data in the JSON
  //       let opStats = op.find(a => a.id === favoriteOperatorResult[0][0]);
  //       console.log(opStats.Operator);
  //       setPlayerProile(playerData);
  //     });
  // };

  return (
    <div className="playerStatsInfoContainer">
      {/*       Overview      */}

      {playerProfile && favDefender && favAttacker ? (
        <div className="statsMainContainer">
          <div className="imgNameAndLvl">
            {/*   Image name and Lvl    */}

            <div className="imgNameLvlContainer">
              <img
                className="playerImageStats"
                src={playerProfile.avatar_url_146}
                alt="player profile"
              />
              <div className="nameAndLvl">
                <h1 style={{ color: "white" }}>{playerProfile.username}</h1>
                <h4 style={{ color: "white" }}>
                  Level {player.progressionStats.level}
                </h4>
              </div>
            </div>
            <FavoriteButton playerProfile={playerProfile} />

            {/*     Actual MMR      */}

            <div>
              <h2 className="playerRanks" style={{ color: "white", margin: 0 }}>
                {player.seasonalStats.max_rank > 0 ? ranks[player.seasonalStats.max_rank].name : 'unranked'}
              </h2>
              <div className="actualRankContainer">
                <img
                  className="previousRank"
                  src={player.seasonalStats.max_rank > 0 ? ranks[player.seasonalStats.max_rank - 1].image : ranks[0].image}
                  alt=""
                />
                <img
                  className="actualRank"
                  src={player.seasonalStats.max_rank > 0 ? ranks[player.seasonalStats.max_rank].image : ranks[0].image}
                  alt=""
                />
                <img
                  className="nextRank"
                  src={player.seasonalStats.max_rank > 0 ? ranks[player.seasonalStats.max_rank + 1].image : ranks[0].image}
                  alt=""
                />
              </div>
              <div className="currentMmrPlayer" style={{ textAlign: "center" }}>
                <h3 style={{ color: "white", margin: 0 }}>
                  Current MMR {player.seasonalStats.mmr || 'unranked'}
                </h3>
              </div>
            </div>
          </div>

          {/*       Content navigation      */}

          <div className="navigationContainer">
            <h2
              className={`linkNavigation ${
                page === "overview" ? "activeLink" : null
              }`}
              onClick={() => setPage("overview")}
            >
              OVERVIEW
            </h2>
            <h2
              className={`linkNavigation ${
                page === "operators" ? "activeLink" : null
              }`}
              onClick={() => setPage("operators")}
            >
              OPERATORS
            </h2>
          </div>

          {/*       Content       */}

          {page === "overview" ? (
            <OverviewRanked
              playerProfile={playerProfile}
              favAttacker={favAttacker}
              favDefender={favDefender}
            />
          ) : <OperatorStats operators={operators.operators} /> }
        </div>
      ) : (
        <img
          // eslint-disable-next-line no-undef
          src={require("./images/logoSiege.png")}
          alt="loading ..."
          className="loadingImagePlayerProfile"
        />
      )}
    </div>
  );
};

export default PlayerStats;
