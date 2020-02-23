import React from 'react';
import ranks from "./datas/ranks";
import './RanksBySeason.css';

const RanksBySeason = ({ playerProfile }) => {
  return (
    <div className="allSeasonsContainer">
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season15rank > 0 ? ranks[playerProfile.season15rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 15</h2>
          <h3>Shifting Tides</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season14rank > 0 ? ranks[playerProfile.season14rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 14</h2>
          <h3>Ember Rise</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season13rank > 0 ? ranks[playerProfile.season13rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 13</h2>
          <h3>Phantom Sight</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season12rank > 0 ? ranks[playerProfile.season12rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 12</h2>
          <h3>Burnt Horizon</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season11rank > 0 ? ranks[playerProfile.season11rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 11</h2>
          <h3>Wind Bastion</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season10rank > 0 ? ranks[playerProfile.season10rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 10</h2>
          <h3>Grim Sky</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ playerProfile.season9rank > 0 ? ranks[playerProfile.season9rank + 2].image : ranks[0].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 9</h2>
          <h3>Para Bellum</h3>
        </div>
      </div>
    </div>
  )
};

export default RanksBySeason;