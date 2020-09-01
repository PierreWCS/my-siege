import React from 'react';
import RanksBySeason from './RanksBySeason';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrosshairs,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import './OverviewRanked.css';

const OverviewRanked = ({
  playerProfile,
  favAttacker,
  favDefender,
  player,
}) => {
  const currentSeason = playerProfile.seasons.steel_wave.regions.emea[0];
  if (favAttacker && favDefender) {
    return (
      <div className="rankedStatsContainer">
        <RanksBySeason playerProfile={playerProfile} />
        <div className="rankedStatsSection">
          <h2 className="titleSection">
            CURRENT{' '}
            <span className="currentSeasonTip">ranked season stats</span>
          </h2>
          {currentSeason.kills ? (
            <div className="kdWLcontainer">
              <h3 className="rankedKD">
                KD:{' '}
                <span className="rankedStatOverview">
                  {currentSeason.kills
                    ? (currentSeason.kills / currentSeason.deaths).toFixed(2)
                    : 0}
                </span>
              </h3>
              <h3 className="rankedWL">
                Winrate:{' '}
                <span className="rankedStatOverview">
                  {currentSeason.wins
                    ? (currentSeason.wins / currentSeason.losses).toFixed(2)
                    : 0}
                </span>
              </h3>
            </div>
          ) : (
            <div className="kdWLcontainer">
              <h3 style={{ margin: '10px 0' }} className="rankedKD">
                No games played this season
              </h3>
            </div>
          )}
          <h2 style={{ marginTop: '10px' }} className="titleSection">
            GLOBAL <span className="currentSeasonTip">ranked stats</span>
          </h2>
          <div className="kdWLcontainer">
            <h3 className="rankedKD">
              KD:{' '}
              <span className="rankedStatOverview">
                {player.genericStats.general.kd.toFixed(2)}
              </span>
            </h3>
            <h3 className="rankedWL">
              Winrate:{' '}
              <span className="rankedStatOverview">
                {player.genericStats.general.wl.toFixed(2)}
              </span>
            </h3>
          </div>

          {/*       Player's favorite attacker and defender       */}

          {/*       Favorite attacker     */}

          <div className="favoriteOperators">
            <div
              className="favoriteAttacker"
              style={{
                backgroundImage: `url(https://cdn.r6stats.com/full-figures/${
                  favAttacker.name === 'Nøkk'
                    ? 'nokk'
                    : favAttacker.name.toLowerCase()
                }_figure.png)`,
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom -100px right 150px',
              }}
            >
              <div className="contentStatsOverviewRankedAttack">
                <h2 className="titleFavoriteOperator">FAVORITE ATTACKER</h2>
                <div className="operatorStatsSmallContainerAttacker">
                  <h2 className="favOperatorName">{favAttacker.name}</h2>
                  <p className="favoriteOperatorKillsAttacker">
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      className="iconKillsDeaths"
                    />
                    {favAttacker.kills}
                  </p>
                  <p className="favoriteOperatorDeathsAttacker">
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      className="iconKillsDeaths"
                    />{' '}
                    {favAttacker.deaths}
                  </p>
                  <p className="favoriteOperatorRatioAttacker">
                    Ratio:{' '}
                    {Math.round(
                      (favAttacker.kills / favAttacker.deaths) * 100
                    ) / 100}
                  </p>
                </div>
              </div>
            </div>

            {/*       Favorite defender       */}

            <div
              className="favoriteDefender"
              style={{
                backgroundImage: `url(https://cdn.r6stats.com/full-figures/${
                  favDefender.name === 'Jäger'
                    ? 'jager'
                    : favDefender.name.toLowerCase()
                }_figure.png)`,
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom -100px left 150px',
              }}
            >
              <div className="contentStatsOverviewRankedDefense">
                <h2 className="titleFavoriteOperator">FAVORITE DEFENDER</h2>
                <div className="operatorStatsSmallContainerDefender">
                  <h2 className="favOperatorName">{favDefender.name}</h2>
                  <p className="favoriteOperatorDefenderKills">
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      className="iconKillsDeaths"
                    />{' '}
                    {favDefender.kills}
                  </p>
                  <p className="favoriteOperatorDeathsDefender">
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      className="iconKillsDeaths"
                    />{' '}
                    {favDefender.deaths}
                  </p>
                  <p className="favoriteOperatorRatioDefender">
                    Ratio:{' '}
                    {Math.round(
                      (favDefender.kills / favDefender.deaths) * 100
                    ) / 100}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default OverviewRanked;
