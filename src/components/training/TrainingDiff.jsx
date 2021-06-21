import React, { useEffect, useState } from 'react';

// css
import './css/training-diff.css';

function TrainingDiff(props) {
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
        let bhti,
            tsi,
            mx;

        if (r1 === undefined || r2 === undefined) {
          return;
        }

        if (r1.mastery > r2.mastery) {
          bhti = r1.breed_higher_tier_increase - r2.breed_higher_tier_increase;
          tsi = r1.taming_success_increase - r2.taming_success_increase;
          mx = r1.mount_xp_increase - r2.mount_xp_increase;
        }
        if (r1.mastery < r2.mastery) {
          bhti = r2.breed_higher_tier_increase - r1.breed_higher_tier_increase;
          tsi = r2.taming_success_increase - r1.taming_success_increase;
          mx = r2.mount_xp_increase - r1.mount_xp_increase;
        }

        let dataArray = [{ 
          breed_higher_tier_increase: bhti.toFixed(2),
          taming_success_increase: tsi.toFixed(2),
          mount_xp_increase: mx.toFixed(2)
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
      breed_higher_tier_increase,
      taming_success_increase,
      mount_xp_increase
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{breed_higher_tier_increase}%</td>
        <td>{taming_success_increase}%</td>
        <td>{mount_xp_increase}%</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined)
    ? diff.map(bracket => {
      const {
        breed_higher_tier_increase,
        taming_success_increase,
        mount_xp_increase
      } = bracket;

    return (
      <tr key="gainz" className="diff-row">
        <td>Gainz!</td>
        <td>&#43; {breed_higher_tier_increase}%</td>
        <td>&#43; {taming_success_increase}%</td>
        <td>&#43; {mount_xp_increase}%</td>
      </tr>
    );
  })
  : null;

  return(
    <div className="training-diff">
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
        <table className="training-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Breed Higher Tier Increase</th>
              <th>Taming Success Increase</th>
              <th>Mount XP Increase</th>
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

export default TrainingDiff;