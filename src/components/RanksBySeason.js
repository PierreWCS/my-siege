import React, {useEffect, useState} from 'react';
import ranks from "./datas/ranks";
import './RanksBySeason.css';

const RanksBySeason = ({ playerProfile }) => {
  const [seaons, setSeasons] = useState(null);

  useEffect(() => {

  }, []);

  const getSeasons = () => {
    let stockSeasons = [];
    playerProfile.forEach((element) => {
      if (element.startsWith('season') !== "") {
        // stockSeasons = stockSeasons[... element]
      }
    })
  };
  return (
    <div className="allSeasonsContainer">
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season15rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 15</h2>
          <h3>Shifting Tides</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season14rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 14</h2>
          <h3>Ember Rise</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season13rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 13</h2>
          <h3>Phantom Sight</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season12rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 12</h2>
          <h3>Burnt Horizon</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season11rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 11</h2>
          <h3>Wind Bastion</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season11rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 10</h2>
          <h3>Grim Sky</h3>
        </div>
      </div>
      <div className="seasonsRank">
        <img className="rankBySeasonImage" src={ranks[playerProfile.season11rank + 2].image} alt="season rank"/>
        <div className="seasonNumberAndName">
          <h2>Season 9</h2>
          <h3>Para Bellum</h3>
        </div>
      </div>
    </div>
  )
};

export default RanksBySeason;
