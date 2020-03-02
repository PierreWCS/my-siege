import React from 'react';
import './OperatorCard.css';

const OperatorCard = ({ operator }) => {
  console.log(operator.operator);
  return (
    <div className="operatorCard">
      <div className="operatorImageAndName">
        <img
          className="operatorStatsImage"
          src={`https://r6tab.com/images/operators/${operator.id.replace(
            ":",
            "-"
          )}.png?`}
          alt="operator"
        />
        <h4 className="operatorDataName">
          {operator.name}
        </h4>
      </div>
      <h5 className="operatorData">
        {operator[0] &&
        operator[0][0] === "wins"
          ? operator[0][1]
          : 0}
      </h5>
      <h5 className="operatorData">
        {operator[1] &&
        operator[1][0] === "losses"
          ? operator[1][1]
          : 0}
      </h5>
      <h5 className="operatorData">
        {operator[1] &&
        operator[1][0] === "losses"
          ? operator.winrate
          : 0}
      </h5>
      <h5 className="operatorData">
        {operator[2] &&
        operator[2][0] === "kills"
          ? operator[2][1]
          : 0}
      </h5>
      <h5 className="operatorData">
        {operator[3] &&
        operator[3][0] === "deaths"
          ? operator[3][1]
          : 0}
      </h5>
      <h5 className="operatorData">
        {operator[3] &&
        operator[3][0] === "deaths"
          ? operator.kd
          : 0}
      </h5>
    </div>
  )
};

export default OperatorCard;
