import React, { useEffect, useState } from "react";
import operatorsData from "./datas/operators";
import "./OperatorStats.css";

const OperatorStats = ({ operators }) => {
  const [playerOperators, setPlayerOperators] = useState();
  console.log("Array of operators :", operators);

  useEffect(() => {
    displayOperatorsStats();
  }, []);

  const displayOperatorsStats = () => {
    for (let key in operators) {
      operatorsData.find(e => {
        if (e.id === key) {
          console.log(e.Operator);
          operators[key].name = e.Operator;
          if (operators[key][2] && operators[key][3]) {
            operators[key].winrate = (
              operators[key][0][1] / operators[key][1][1]
            ).toFixed(2);
          }
          if (operators[key][2] && operators[key][3]) {
            operators[key].kd = (
              operators[key][2][1] / operators[key][3][1]
            ).toFixed(2);
          }
          operators[key].type = e.Type;
        }
      });
      console.log(key + ":" + operators[key]);
    }
    setPlayerOperators(operators);
  };

  return (
    <div>
      <h1>All operators stats</h1>
      <div className="operatorsHeader">
        <h1>Operator</h1>
        <h3>Wins</h3>
        <h3>Losses</h3>
        <h3>Winrate</h3>
        <h3>Kills</h3>
        <h3>Deaths</h3>
        <h3>K/D</h3>
      </div>
      {playerOperators
        ? Object.keys(playerOperators).map(key => {
            if (playerOperators[key].name) {
              return (
                <div className="operatorCard" key={key}>
                  <div className="operatorImageAndName">
                    <img
                      className="favoriteOperatorImage"
                      src={`https://r6tab.com/images/operators/${key.replace(
                        ":",
                        "-"
                      )}.png?`}
                      alt="favorite operator"
                    />
                    <h4 className="operatorDataName">
                      {playerOperators[key].name}
                    </h4>
                  </div>
                  <h5 className="operatorData">
                    {playerOperators[key][0] &&
                    playerOperators[key][0][0] === "wins"
                      ? playerOperators[key][0][1]
                      : 0}
                  </h5>
                  <h5 className="operatorData">
                    {playerOperators[key][1] &&
                    playerOperators[key][1][0] === "losses"
                      ? playerOperators[key][1][1]
                      : 0}
                  </h5>
                  <h5 className="operatorData">
                    {playerOperators[key][1] &&
                    playerOperators[key][1][0] === "losses"
                      ? playerOperators[key].winrate
                      : 0}
                  </h5>
                  <h5 className="operatorData">
                    {playerOperators[key][2] &&
                    playerOperators[key][2][0] === "kills"
                      ? playerOperators[key][2][1]
                      : 0}
                  </h5>
                  <h5 className="operatorData">
                    {playerOperators[key][3] &&
                    playerOperators[key][3][0] === "deaths"
                      ? playerOperators[key][3][1]
                      : 0}
                  </h5>
                  <h5 className="operatorData">
                    {playerOperators[key][3] &&
                    playerOperators[key][3][0] === "deaths"
                      ? playerOperators[key].kd
                      : 0}
                  </h5>
                </div>
              );
            } else {
              console.log(`Error on : ${key}`);
            }
          })
        : null}
    </div>
  );
};

export default OperatorStats;
