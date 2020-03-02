import React, { useEffect, useState } from "react";
import operatorsData from "./datas/operators";
import "./OperatorStats.css";
import OperatorCard from "./OperatorCard";

const OperatorStats = ({ operators }) => {
  const [displayChoice, setDisplayChoice] = useState("attackers");
  const [playerOperators, setPlayerOperators] = useState();
  const [playerAttackers, setPlayerAttackers] = useState();
  const [playerDefenders, setPlayerDefenders] = useState();

  useEffect(() => {
    displayOperatorsStats();
  }, []);

  const displayOperatorsStats = () => {
    for (let key in operators) {
      operatorsData.find(e => {
        if (e.id === key) {
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
          operators[key].id = e.id;
        }
      });
    }
    let attackers = [];
    let defenders = [];
    Object.keys(operators).map(key => {
      if (operators[key].type === "Attacker") {
        attackers.push(operators[key]);
        console.log("I'm an attacker" + operators[key].name)
      }
      else {
        defenders.push(operators[key])
      }
    });
    setPlayerAttackers(attackers);
    setPlayerDefenders(defenders);
    setPlayerOperators(operators);

    console.log(attackers);
    console.log(defenders);
  };


  return (
    <div className="operatorsStatsContainer">
      <div>
        <h1 className="titleOperators" onClick={() => setDisplayChoice("attackers")}>Attackers</h1>
        <h1 className="titleOperators" onClick={() => setDisplayChoice("defenders")}>Defenders</h1>
      </div>
      <div className="operatorsHeader">
        <h1>Operator</h1>
        <h3>Wins</h3>
        <h3>Losses</h3>
        <h3>Winrate</h3>
        <h3>Kills</h3>
        <h3>Deaths</h3>
        <h3>K/D</h3>
      </div>
      <div className="operatorsResult">
        {
          playerOperators && displayChoice === "attackers" ?
            playerAttackers.map((operator, key) => {
              if (operator.name) {
                return (
                  <OperatorCard key={key} operator={operator} />
                )
              }
            })
            : null
        }
        {
          playerOperators && displayChoice === "defenders" ?
            playerDefenders.map((operator, key) => {
              if (operator.name) {
                return (
                  <OperatorCard key={key} operator={operator} />
                )
              }
            })
            : null
        }
      </div>
    </div>
  );
};

export default OperatorStats;
