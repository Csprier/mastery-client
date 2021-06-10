import { useEffect, useState } from 'react';

// components
import Filter from './Filter';

function GatheringData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);
  const [filter, setFilter] = useState('');


  async function fetchAllGatheringData() {
    const data = await fetch('http://localhost:8080/gathering')
      .then(res => res.json())
      .catch(e => console.error(e));
    let masteriesData = data.map(bracket => { 
      return { mastery: bracket.mastery }
    });
    setData(data);
    setMasteries(masteriesData);
  };
    
  useEffect(() => {
    if (data.length === 0) {
      fetchAllGatheringData();
    }
  }, [data, masteries]);

  let dataRows = data.map(bracket => {
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

  let filteredData = data.filter(item => (item.mastery === filter));
  let filteredDataRows = filteredData.map(bracket => {
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

  let rowsToRender = (filter) ? filteredDataRows : dataRows;

  return(
    <div>
      <h1>Gathering Data!</h1>
      <Filter 
        masteries={masteries}
        setFilter={setFilter}
      />
      <table className="fixed-rows">
        <tbody>
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
        </tbody>
      </table>
      <div className="table-container">
        <table>
          <tbody>
            {rowsToRender}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatheringData;