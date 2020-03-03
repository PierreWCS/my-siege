import React from 'react';
import RanksBySeason from "./RanksBySeason";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrosshairs, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import './OverviewRanked.css';

const OverviewRanked = ({ playerProfile, favAttacker, favDefender }) => {
  return (
    <div className="rankedStatsContainer">
      <RanksBySeason playerProfile={playerProfile} />
      <div className="rankedStatsSection">
        <h1 className="titleSection">RANKED <span className="currentSeasonTip">current season</span></h1>
        <div className="kdWLcontainer">
          <h2 className="rankedKD">KD: <span className="rankedStatOverview">{(playerProfile.ranked.EU_kills / playerProfile.ranked.EU_deaths).toFixed(2)}</span></h2>
          <h2 className="rankedWL">Winrate: <span className="rankedStatOverview">{(playerProfile.ranked.EU_wins / playerProfile.ranked.EU_losses).toFixed(2)}</span></h2>
        </div>
        <div className="statsRankedSmallContainer">
          <p className="smallStatsItem">
            KILLS: <span className="statNumberOverviewRanked">{playerProfile.ranked.EU_kills}</span>
          </p>
          <p className="smallStatsItem">
            DEATHS: <span className="statNumberOverviewRanked">{playerProfile.ranked.EU_deaths}</span>
          </p>
        </div>
        <div className="statsRankedSmallContainer">
          <p className="smallStatsItem">
            WINS: <span className="statNumberOverviewRanked">{playerProfile.ranked.EU_wins}</span>
          </p>
          <p className="smallStatsItem">
            LOSSES: <span className="statNumberOverviewRanked">{playerProfile.ranked.EU_losses}</span>
          </p>
        </div>

        {/*       Player's favorite attacker and defender       */}

        {/*       Favorite attacker     */}

        <div className="favoriteOperators">
          <div
            className="favoriteAttacker"
            style={{
              backgroundImage: `url(https://cdn.r6stats.com/full-figures/${favAttacker[5].Operator.toLowerCase()}_figure.png)`,
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom -100px right 150px'
            }}
          >
            <div className="contentStatsOverviewRankedAttack">
              <h2 className="titleFavoriteOperator">Favorite attacker: <span className="favOperatorName">{favAttacker[5].Operator}</span></h2>
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
          </div>

          {/*       Favorite defender       */}

          <div
            className="favoriteDefender"
            style={{
              backgroundImage: `url(https://cdn.r6stats.com/full-figures/${favDefender[5].Operator.toLowerCase()}_figure.png)`,
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom -100px left 150px'
            }}
          >
            <div className="contentStatsOverviewRankedDefense">
              <h2 className="titleFavoriteOperator">Favorite defender <span className="favOperatorName">{favDefender[5].Operator}</span></h2>
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
  )
};

export default OverviewRanked;
