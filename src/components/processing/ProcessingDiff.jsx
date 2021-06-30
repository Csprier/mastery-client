import React, { useEffect, useState } from 'react';

// css
import './css/processing-diff.css';

function ProcessingDiff(props) {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [range, setRange] = useState([]);
  const [diff, setDiff] = useState([]);
  const [viewAll, setViewAll] = useState(false);

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
        let quantity;

        if (r1 === undefined || r2 === undefined) {
          return;
        }

        if (r1.mastery > r2.mastery) {
          quantity = r1.quantity - r2.quantity;
        }
        if (r1.mastery < r2.mastery) {
          quantity = r2.quantity - r1.quantity;
        }

        let dataArray = [{ quantity }];
        return dataArray;
      }
    };
    let diffData = createDiffObjectWithValuesToRender();
    setDiff(diffData);
  }, [range]);

  useEffect(() => {
    function resetOptionElementValues() {
      let masteryA = document.getElementById('m1');
      let masteryB = document.getElementById('m2');

      masteryA.selectedIndex = 0;
      masteryB.selectedIndex = 0;
      return;
    };

    if (viewAll && range.length > 0) {
      setM1('');
      setM2('');
      setRange([]);
      resetOptionElementValues();
      setViewAll(false);
    }
    if (viewAll && range.length === 0) {
      setViewAll(false);
    }
  }, [viewAll]);

  /** ===============================================/
   * ROW COMPONENTS
   * ==========================*/
   const allRows = props.data.map(bracket => {
    const {
      mastery,
      quantity
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{quantity}%</td>
      </tr>
    );
  });

  const rangeRows = range.map(bracket => {
    const {
      mastery,
      quantity
    } = bracket;

    return (
      <tr key={mastery} className="range-row">
        <td>{mastery}</td>
        <td>{quantity}</td>
      </tr>
    );
  });

  const diffRow = (diff !== undefined)
    ? diff.map(bracket => {
      const {
        quantity
      } = bracket;

    return (
      <tr key="gainz" className="diff-row">
        <td>Gainz!</td>
        <td>&#43; {quantity}</td>
      </tr>
    );
  })
  : null;

  return(
    <div className="processing-diff">
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
        <button 
          className='view-all-button' 
          onClick={() => setViewAll(!viewAll)}
        >View table</button>
      </div>
      <div className="table-display">
        <table className="processing-info">
          <thead>
            <tr className="info-row">
              <th>Mastery</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {(range.length > 0) ? rangeRows : allRows}
            {diffRow}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessingDiff;