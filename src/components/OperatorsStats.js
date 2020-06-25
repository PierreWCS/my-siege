import React, { useState } from "react";
import "./OperatorStats.css";
import OperatorCard from "./OperatorCard";

const OperatorStats = ({ operators }) => {
  const [displayChoice, setDisplayChoice] = useState("attackers");

  return (
    <div className="operatorsStatsContainer">
      <div className="attackerDefenderChoiceContainer">
        <h1 className={`titleOperatorsAttack ${displayChoice === "attackers" ? "selectedDisplay" : null}`} onClick={() => setDisplayChoice("attackers")}>Attackers<img className="attackDefendImage" alt="attackers" src={require('./images/AttackerNoBackground.png')} /></h1>
        <h1 className={`titleOperatorsDefense ${displayChoice === "defenders" ? "selectedDisplay" : null}`} onClick={() => setDisplayChoice("defenders")}><img className="attackDefendImage" alt="attackers" src={require('./images/defendersR6NoBackground.png')} />Defenders</h1>
      </div>
      <div className="operatorsHeader">
        <h1 className="operatorHeaderItemOperator">Operator</h1>
        <h3 className="operatorHeaderItem">Wins</h3>
        <h3 className="operatorHeaderItem">Losses</h3>
        <h3 className="operatorHeaderItem">Winrate</h3>
        <h3 className="operatorHeaderItem" >Kills</h3>
        <h3 className="operatorHeaderItem">Deaths</h3>
        <h3 className="operatorHeaderItem">K/D</h3>
      </div>
      <div className="operatorsResult">
        {
          operators && displayChoice === "attackers" ?
            operators.map((operator, key) => {
              if (operator.role === 'Attacker') {
                return (
                  <OperatorCard key={key} operator={operator} />
                )
              }
            })
            : null
        }
        {
          operators && displayChoice === "defenders" ?
            operators.map((operator, key) => {
              if (operator.role === 'Defender') {
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
