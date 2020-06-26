import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./PlayerProfile.css";
import ranks from "./datas/ranks";
import OverviewRanked from "./OverviewRanked";
import OperatorStats from "./OperatorsStats";

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

  const getPlayerStats = async function() {
    let stockPlayerData = getPlayerSeasonStats();
    await setPlayerProfile(stockPlayerData);
  };

  const getPlayerSeasonStats = function() {
    Axios({
      method: "get",
      url: `https://api2.r6stats.com/public-api/stats/${player.username}/pc/seasonal`,
      headers: { Authorization: tokenKey }
    })
      .then(result => {
        setPlayerProfile(result.data);
        getPlayerOperatorsStats();
      })
      .catch(error => console.log(error));
  };

  const getPlayerOperatorsStats = () => {
    Axios({
      method: "get",
      headers: { Authorization: tokenKey },
      url: `https://api2.r6stats.com/public-api/stats/${player.username}/pc/operators`
    }).then(result => {
      let requestRes = result.data;
      let favoriteDefender = null;
      let currentDefenderKills = 0;
      requestRes.operators.map(operator => {
        if (
          operator.role === "Defender" &&
          operator.kills > currentDefenderKills
        ) {
          favoriteDefender = operator;
          currentDefenderKills = operator.kills;
          return 1;
        } else return 0;
      });

      let favoriteAttacker = null;
      let currentAttackerKills = 0;
      requestRes.operators.map(operator => {
        if (
          operator.role === "Attacker" &&
          operator.kills > currentAttackerKills
        ) {
          favoriteAttacker = operator;
          currentAttackerKills = operator.kills;
          return 1;
        } else return 0;
      });
      setFavDefender(favoriteDefender);

      setFavAttacker(favoriteAttacker);

      setOperators(requestRes);
    });
  };

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

            {/*     Actual MMR      */}

            <div>
              <h2 className="playerRanks" style={{ color: "white", margin: 0 }}>
                {player.seasonalStats.max_rank > 0
                  ? ranks[player.seasonalStats.max_rank].name
                  : "unranked"}
              </h2>
              <div className="actualRankContainer">
                <img
                  className="previousRank"
                  src={
                    player.seasonalStats.max_rank > 0
                      ? ranks[player.seasonalStats.max_rank - 1].image
                      : ranks[0].image
                  }
                  alt=""
                />
                <img
                  className="actualRank"
                  src={
                    player.seasonalStats.max_rank > 0
                      ? ranks[player.seasonalStats.max_rank].image
                      : ranks[0].image
                  }
                  alt=""
                />
                <img
                  className="nextRank"
                  src={
                    player.seasonalStats.max_rank > 0
                      ? ranks[player.seasonalStats.max_rank + 1].image
                      : ranks[0].image
                  }
                  alt=""
                />
              </div>
              <div className="currentMmrPlayer" style={{ textAlign: "center" }}>
                <h3 style={{ color: "white", margin: 0 }}>
                  Current MMR {player.seasonalStats.mmr || "unranked"}
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
          ) : (
            <OperatorStats operators={operators.operators} />
          )}
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
