import React from 'react';
import operatorsData from './datas/operators';

const OperatorStats = ({ operators }) => {
  console.log("Array of operators :", operators);
  return (
    <div>
      <h1>All operators stats</h1>
      {
        operators ?
          operators.map((op, key) => {
            return (
              <div key={key}>
                <h3>{op}</h3>
              </div>
            )
          })
          : null
      }
    </div>
  )
};

export default OperatorStats;
