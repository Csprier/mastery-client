import React, { useEffect, useState } from 'react';

// css
import './css/cooking-diff.css';

function CookingDiff(props) {
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
        return parseInt(bracket.mastery, 10) === parseInt(m1, 10) || parseInt(bracket.mastery, 10) === parseInt(m2, 10);
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
        let mdc,
            hgmac,
            hgc,
            mcc,
            ics;

        if (r1 === undefined || r2 === undefined) {
          return;
        }

        if (r1.mastery > r2.mastery) {
          mdc = r1.max_dishes_chance - r2.max_dishes_chance;
          hgmac = r1.higher_grade_max_amount_chance - r2.higher_grade_max_amount_chance;
          hgc = r1.higher_grade_chance - r2.higher_grade_chance;
          mcc = r1.mass_cooking_chance - r2.mass_cooking_chance;
          ics = r1.imperial_cooking_silver - r2.imperial_cooking_silver;
        }
        if (r1.mastery < r2.mastery) {
          mdc = r2.max_dishes_chance - r1.max_dishes_chance;
          hgmac = r2.higher_grade_max_amount_chance - r1.higher_grade_max_amount_chance;
          hgc = r2.higher_grade_chance - r1.higher_grade_chance;
          mcc = r2.mass_cooking_chance - r1.mass_cooking_chance;
          ics = r2.imperial_cooking_silver - r1.imperial_cooking_silver;
        }
        
        let dataArray = [{
          max_dishes_chance: mdc.toFixed(2),
          higher_grade_chance: hgc.toFixed(2),
          higher_grade_max_amount_chance: hgmac.toFixed(2),
          mass_cooking_chance: mcc.toFixed(2),
          imperial_cooking_silver: ics.toFixed(2)
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
      higher_grade_chance,
      higher_grade_max_amount_chance,
      imperial_cooking_silver,
      mass_cooking_chance,
      max_dishes_chance,
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{higher_grade_chance}%</td>
        <td>{higher_grade_max_amount_chance}%</td>
        <td>{imperial_cooking_silver}%</td>
        <td>{mass_cooking_chance}%</td>
        <td>{max_dishes_chance}%</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined)
    ? diff.map(bracket => {
      const {
        mastery,
        higher_grade_chance,
        higher_grade_max_amount_chance,
        imperial_cooking_silver,
        mass_cooking_chance,
        max_dishes_chance,
      } = bracket;

      return (
        <tr key={mastery} className="diff-row">
          <td>Gainz!</td>
          <td>&#43; {higher_grade_chance}%</td>
          <td>&#43; {higher_grade_max_amount_chance}%</td>
          <td>&#43; {imperial_cooking_silver}%</td>
          <td>&#43; {mass_cooking_chance}%</td>
          <td>&#43; {max_dishes_chance}%</td>
        </tr>
      );
    })
    : null;

  return (
    <div className="cooking-diff">
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
        <table className="cooking-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Max Dishes Chance</th>
              <th>Higher Grade Max Amount Chance</th>
              <th>Higher Grade Chance</th>
              <th>Mass Cooking Chance</th>
              <th>Imperial Cooking Silver</th>
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

export default CookingDiff;