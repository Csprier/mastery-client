// import { useState } from 'react';

function Filter(props) {
  // const [filter, setFilter] = useState(-1);
  // console.log('filter: ', filter);
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

  const { setFilter } = props;
  let dynamicFilter = () => {
    let value = parseInt(document.getElementById('filter').value, 10);
    // console.log('value:::', typeof value);
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