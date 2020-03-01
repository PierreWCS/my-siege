import React from 'react';
import RanksBySeason from "./RanksBySeason";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrosshairs, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";

const OverviewRanked = ({ playerProfile, favAttacker, favDefender }) => {
  return (
    <div className="rankedStatsContainer">
      <RanksBySeason playerProfile={playerProfile} />
      <div className="rankedStatsSection">
        <h1 className="titleSection">Current season ranked stats</h1>
        <h2 style={{ margin: '15px' }}>Ranked KD: {playerProfile.kd / 100}</h2>
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
  )
};

export default OverviewRanked;
