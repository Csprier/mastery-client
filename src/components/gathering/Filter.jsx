import { useState } from 'react';

function Filter(props) {
  const [filter, setFilter] = useState(-1);
  console.log('filter: ', filter);
  const masteryOptionElements = props.masteries.map(bracket => {
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

  let dynamicFilter = (props) => {
    let value = document.getElementById('filter').value;
    console.log('value:::', value);
    setFilter(value);
  };

  return (
    <div>
      <select name="mastery-filter" id="filter" onChange={dynamicFilter}>
        {masteryOptionElements}
      </select>
    </div>
  )
};

export default Filter;