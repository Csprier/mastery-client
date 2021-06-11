import { useEffect, useState } from 'react';

function GatheringDiff(props) {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [range, setRange] = useState([]);

  /** ===============================================/
   *  RANGE FUNCTIONS 
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
    let range = props.data.filter((bracket) => {
      return parseInt(bracket.mastery) === parseInt(m1) || parseInt(bracket.mastery) === parseInt(m2);
    });
    console.log('range', range);
    // setRange(range);
  }, [m1, m2, range, props]);


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
      <tr key={mastery}>
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

  return (
    <div className="gathering-diff">
      <div>
        <select
          id="m1"
          onChange={setRange1}
        >
          <option>Select Mastery A</option>
          {masteryOptionElementsStart}
        </select>
        <select
          id="m2"
          onChange={setRange2}
        >
          <option>Select Mastery B</option>
          {masteryOptionElementsStop}
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatheringDiff;