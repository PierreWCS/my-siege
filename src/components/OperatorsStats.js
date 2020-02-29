import React from 'react';
import operatorsData from './datas/operators';

const OperatorStats = ({ playerProfile, operators }) => {
  console.log(operators);
  return (
    <div>
      <h1>All operators stats</h1>
      {
        operators[0].map((op, key) => {
          let opStats = operatorsData.find(element => element.id === op[0]);
          return (
            <div key={key}>
              <p>{opStats.Operator}</p>
            </div>
          )
        })
      }
    </div>
  )
};

export default OperatorStats;
