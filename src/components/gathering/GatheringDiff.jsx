import { useEffect, useState } from 'react';

// css
import './gathering-diff.css';

function GatheringDiff(props) {
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
        let bi_dc, 
            bi_da,
            rr_dc,
            rr_da,
            sr_dc,
            sr_da,
            vrr_dc,
            vrr_da;
    
        if (r1 === undefined || r2 === undefined) {
          return;
        }
    
        if (r1.mastery > r2.mastery) {
          bi_dc = r1.basic_item_drop_chance - r2.basic_item_drop_chance;
          bi_da = r1.basic_item_drop_amount - r2.basic_item_drop_amount;
          rr_dc = r1.rare_resource_drop_chance - r2.rare_resource_drop_chance;
          rr_da = r1.rare_resource_drop_amount - r2.rare_resource_drop_amount;
          sr_dc = r1.special_resource_drop_chance - r2.special_resource_drop_chance;
          sr_da = r1.special_resource_drop_amount - r2.special_resource_drop_amount;
          vrr_da = r1.very_rare_resource_drop_chance - r2.very_rare_resource_drop_chance;
          vrr_dc = r1.very_rare_resource_drop_amount - r2.very_rare_resource_drop_amount;
        }
        if (r1.mastery < r2.mastery) {
          bi_dc = r2.basic_item_drop_chance - r1.basic_item_drop_chance;
          bi_da = r2.basic_item_drop_amount - r1.basic_item_drop_amount;
          rr_dc = r2.rare_resource_drop_chance - r1.rare_resource_drop_chance;
          rr_da = r2.rare_resource_drop_amount - r1.rare_resource_drop_amount;
          sr_dc = r2.special_resource_drop_chance - r1.special_resource_drop_chance;
          sr_da = r2.special_resource_drop_amount - r1.special_resource_drop_amount;
          vrr_da = r2.very_rare_resource_drop_chance - r1.very_rare_resource_drop_chance;
          vrr_dc = r2.very_rare_resource_drop_amount - r1.very_rare_resource_drop_amount;
        }
    
        let dataArray = [{
          basic_item_drop_chance: bi_dc.toFixed(2),
          basic_item_drop_amount: bi_da.toFixed(2),
          rare_resource_drop_chance: rr_dc.toFixed(2),
          rare_resource_drop_amount: rr_da.toFixed(2),
          special_resource_drop_chance: sr_dc.toFixed(2),
          special_resource_drop_amount: sr_da.toFixed(2),
          very_rare_resource_drop_chance: vrr_dc.toFixed(2),
          very_rare_resource_drop_amount: vrr_da.toFixed(2)
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
      basic_item_drop_chance,
      basic_item_drop_amount,
      rare_resource_drop_chance,
      rare_resource_drop_amount,
      special_resource_drop_chance,
      special_resource_drop_amount,
      very_rare_resource_drop_chance,
      very_rare_resource_drop_amount
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{basic_item_drop_chance}%</td>
        <td>{basic_item_drop_amount}%</td>
        <td>{rare_resource_drop_chance}%</td>
        <td>{rare_resource_drop_amount}%</td>
        <td>{special_resource_drop_chance}%</td>
        <td>{special_resource_drop_amount}%</td>
        <td>{very_rare_resource_drop_chance}%</td>
        <td>{very_rare_resource_drop_amount}%</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined) 
    ? diff.map(bracket => {
      const { 
        basic_item_drop_chance,
        basic_item_drop_amount,
        rare_resource_drop_chance,
        rare_resource_drop_amount,
        special_resource_drop_chance,
        special_resource_drop_amount,
        very_rare_resource_drop_chance,
        very_rare_resource_drop_amount
      } = bracket;
      
      return (
        <tr key="diff" className="diff-row">
          <td>Gainz!</td>
          <td>&#43; {basic_item_drop_chance}%</td>
          <td>&#43; {basic_item_drop_amount}%</td>
          <td>&#43; {rare_resource_drop_chance}%</td>
          <td>&#43; {rare_resource_drop_amount}%</td>
          <td>&#43; {special_resource_drop_chance}%</td>
          <td>&#43; {special_resource_drop_amount}%</td>
          <td>&#43; {very_rare_resource_drop_chance}%</td>
          <td>&#43; {very_rare_resource_drop_amount}%</td>
        </tr>
      );
    })
  : null;

  // RETURN STATEMENT FOR COMPONENT
  return (
    <div className="gathering-diff">
      <div className="mastery-selectors">
        <h4>Compare 2 masteries to see the difference!</h4>
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
        <table className="gathering-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Basic Item Drop Chance</th>
              <th>Basic Item Drop Amount</th>
              <th>Rare Resources Item Drop Chance</th>
              <th>Rare Resources Item Drop Chance</th>
              <th>Special Resources Item Drop Chance</th>
              <th>Special Resources Item Drop Chance</th>
              <th>Very Rare Resources Item Drop Chance</th>
              <th>Very Rare Resources Item Drop Chance</th>
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

export default GatheringDiff;