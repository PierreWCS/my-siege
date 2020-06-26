import React from "react";
import "./OperatorCard.css";

const OperatorCard = ({ operator }) => {
  console.log(operator);
  return (
    <div className="operatorCard">
      <div className="operatorImageAndName">
        <img
          className="operatorStatsImage"
          src={operator.badge_image}
          alt="operator"
        />
        <h4 className="operatorDataName">{operator.name}</h4>
      </div>
      <h5 className="operatorData">{operator.wins ? operator.wins : 0}</h5>
      <h5 className="operatorData">{operator.losses ? operator.losses : 0}</h5>
      <h5 className="operatorData">{operator.wins ? ((operator.wins / operator.losses * 100) / 100).toFixed(2) : 0}</h5>
      <h5 className="operatorData">{operator.kills ? operator.kills : 0}</h5>
      <h5 className="operatorData">{operator.deaths ? operator.deaths : 0}</h5>
      <h5 className="operatorData">{operator.kd ? operator.kd.toFixed(2) : 0}</h5>
    </div>
  );
};

export default OperatorCard;
