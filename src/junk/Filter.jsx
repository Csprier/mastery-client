import './filter.css';

function Filter(props) {
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
    <div className="filter">
      <select 
        className="filter-select"
        name="mastery-filter" 
        id="filter" 
        onChange={dynamicFilter}
      >
        <option value="#">Filter by Mastery</option>
        {masteryOptionElements}
      </select>
    </div>
  )
};

export default Filter;