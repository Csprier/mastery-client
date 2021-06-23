import React, { useEffect, useState } from 'react';

// css
import './css/alchemy-diff.css';

function AlchemyDiff(props) {
  console.log('props', props);
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
        let cfm,
            rb,
            sb,
            ip;
            
        if (r1 === undefined || r2 === undefined) {
          return;
        }
        if (r1.mastery > r2.mastery) {
          cfm = r1.chance_for_max - r2.chance_for_max;
          rb = r1.rare_byproduct - r2.rare_byproduct;
          sb = r1.special_byproduct - r2.special_byproduct;
          rb = r1.regular_by_product - r2.regular_by_product;
          ip = r1.imperial_profit - r2.imperial_profit;
        }
        if (r1.mastery < r2.mastery) {
          cfm = r2.chance_for_max - r1.chance_for_max;
          rb = r2.rare_byproduct - r1.rare_byproduct;
          sb = r2.special_byproduct - r1.special_byproduct;
          rb = r2.regular_by_product - r1.regular_by_product;
          ip = r2.imperial_profit - r1.imperial_profit;
        }

        let dataArray = [{ 
          chance_for_max: cfm.toFixed(2),
          rare_byproduct: rb.toFixed(2),
          special_byproduct: sb.toFixed(2),
          regular_by_product: rb.toFixed(2),
          imperial_profit: ip.toFixed(2)
        }];
        return dataArray;
      };
    };
    let diffData = createDiffObjectWithValuesToRender();
    setDiff(diffData);
  }, [range]);

  const rangeRows = range.map(bracket => {
    const {
      mastery,
      chance_for_max,
      rare_byproduct,
      special_byproduct,
      regular_by_product,
      imperial_profit
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{chance_for_max}</td>
        <td>{rare_byproduct}</td>
        <td>{special_byproduct}</td>
        <td>{regular_by_product}</td>
        <td>{imperial_profit}</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined)
  ? diff.map(bracket => {
    const {
      chance_for_max,
      rare_byproduct,
      special_byproduct,
      regular_by_product,
      imperial_profit
    } = bracket;

    return (
      <tr key="gainz" className="diff-row">
        <td>Gainz!</td>
        <td>&#43; {chance_for_max.toFixed(2)}</td>
        <td>&#43; {rare_byproduct.toFixed(2)}</td>
        <td>&#43; {special_byproduct.toFixed(2)}</td>
        <td>&#43; {regular_by_product.toFixed(2)}</td>
        <td>&#43; {imperial_profit.toFixed(2)}</td>
      </tr>
    );
  })
  : null;

  return (
    <div className="fishing-diff">
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
        <table className="fishing-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Chance For Max</th>
              <th>Rare Byproduct</th>
              <th>Special Byproduct</th>
              <th>Regular By Product</th>
              <th>Imperial Profi</th>
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

export default AlchemyDiff;