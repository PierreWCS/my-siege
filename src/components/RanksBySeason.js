import React from "react";
import ranks from "./datas/ranks";
import "./RanksBySeason.css";

const RanksBySeason = ({ playerProfile }) => {
  const stockSeasons = Object.values(playerProfile.seasons);
  return (
    <div className="allSeasonsContainer">
      <h1 className="titleSeason">LAST SEASONS</h1>
      {stockSeasons.map((season, key) => {
        return (
          <div key={key} className="seasonsRank">
            <img
              src={ranks[season.regions.emea[0].max_rank].image}
              alt=""
              className="rankBySeasonImage"
            />
            <div className="seasonNumberAndName">
              <h2>{season.name}</h2>
              <h3>Season {season.regions.emea[0].season_id}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RanksBySeason;
