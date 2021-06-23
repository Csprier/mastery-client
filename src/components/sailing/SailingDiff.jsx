import React, { useEffect, useState } from 'react';

// css
import './css/sailing-diff.css';

function SailingDiff(props) {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [range, setRange] = useState([]);
  const [diff, setDiff] = useState([]);

  /** ===============================================/
   *  RANGE FROM SELECT ELEMENT FUNCTIONS 
   * ==========================*/
  function setRange1() {
    let range = document.getElementById('m1').value;
    setM1(range);
  };
  function setRange2() {
    let range = document.getElementById('m2').value;
    setM2(range);
  };

  /** ===============================================/
   * OPTION ELEMENTS JSX 
   * ==========================*/
   const masteryOptionElementsStart = props.masteries.map(bracket => {
    return (
      <option 
        value={bracket.mastery}
        key={bracket.mastery}
        id={bracket.mastery}
      >
        {bracket.mastery}
      </option>
    )
  });
  const masteryOptionElementsStop = props.masteries.map(bracket => {
    return (
      <option 
        value={bracket.mastery}
        key={bracket.mastery}
        id={bracket.mastery}
      >
        {bracket.mastery}
      </option>
    )
  });

  /** ===============================================/
   * DATA FUNCTIONS
   * ==========================*/
   useEffect(() => {
    function updateRange() {
      let dyanmicRange = props.data.filter((bracket) => {
        return parseInt(bracket.mastery) === parseInt(m1) || parseInt(bracket.mastery) === parseInt(m2);
      });
      setRange(dyanmicRange);
    };
    updateRange();
  }, [m1, m2, props.data]);

  useEffect(() => {
    function createDiffObjectWithValuesToRender() {
      if (range !== undefined || range.length > 0) {
        let rangeRow = range;
        let r1 = rangeRow[0];
        let r2 = rangeRow[1];
        let ai,
            si,
            ti, 
            bi;

        if (r1 === undefined || r2 === undefined) {
          return;
        }

        if (r1.mastery > r2.mastery) {
          ai = r1.acceleration_increase - r2.acceleration_increase;
          si = r1.speed_increase - r2.speed_increase;
          ti = r1.turn_increase - r2.turn_increase;
          bi = r1.brake_increase - r2.brake_increase;
        }
        if (r1.mastery < r2.mastery) {
          ai = r2.acceleration_increase - r1.acceleration_increase;
          si = r2.speed_increase - r1.speed_increase;
          ti = r2.turn_increase - r1.turn_increase;
          bi = r2.brake_increase - r1.brake_increase;
        }

        let dataArray = [{
          acceleration_increase: ai.toFixed(2),
          speed_increase: si.toFixed(2),
          turn_increase: ti.toFixed(2),
          brake_increase: bi.toFixed(2)
        }];
        return dataArray;
      }
    };
    let diffData = createDiffObjectWithValuesToRender();
    setDiff(diffData);
  }, [range]);

  const rangeRows = range.map(bracket => {
    const {
      mastery,
      acceleration_increase,
      speed_increase,
      turn_increase,
      brake_increase
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{acceleration_increase}%</td>
        <td>{speed_increase}%</td>
        <td>{turn_increase}%</td>
        <td>{brake_increase}%</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined)
    ? diff.map(bracket => {
      const {
        acceleration_increase,
        speed_increase,
        turn_increase,
        brake_increase
      } = bracket;

    return (
      <tr key="gainz" className="diff-row">
        <td>Gainz!</td>
        <td>&#43; {acceleration_increase}%</td>
        <td>&#43; {speed_increase}%</td>
        <td>&#43; {turn_increase}%</td>
        <td>&#43; {brake_increase}%</td>
      </tr>
    );
  })
  : null;

  return(
    <div className="sailing-diff">
      <div className="mastery-selectors">
        <h4>Compare 2 masteries to see the difference!</h4>
        <p>* Order does not matter, it will calculate automatically. *</p>
        <select 
          id="m1"
          className="mastery-select"
          onChange={setRange1}
        >
          <option>Select Mastery A</option>
          {masteryOptionElementsStart}
        </select>
        <select
          id="m2"
          className="mastery-select"
          onChange={setRange2}
        >
          <option>Select Mastery B</option>
          {masteryOptionElementsStop}
        </select>
      </div>
      <div className="table-display">
        <table className="sailing-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Acceleration Increase</th>
              <th>Speed Increase</th>
              <th>Turn Increase</th>
              <th>Brake Increase</th>
            </tr>
          </thead>
          <tbody>
            {rangeRows}
            {diffRow}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SailingDiff;