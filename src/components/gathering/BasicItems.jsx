import { useEffect, useState } from 'react';
import './basic-items.css';

function BasicItems() {
  const [basicItems, setBasicItemData] = useState([]);

  async function fetchBasicItemData() {
    const res = await fetch('http://localhost:8080/gathering/basic-items')
      .then(res => res.json())
      .catch(e => console.error(e));
    let basicItemData = res.map(bracket => {
      return { 
        mastery: bracket.Mastery,
        itemChance: bracket.ItemChance,
        dropAmount: bracket.DropAmount
      }
    });
    console.log('Basic Item Data:::', basicItemData);
    setBasicItemData(basicItemData);
  };

  useEffect(() => {
    if (basicItems.length === 0) {
      fetchBasicItemData();
    }
  }, [basicItems]);

  let basicItemDataRows = basicItems.map(item => {
    const { mastery, itemChance, dropAmount } = item;
    return (
      <tr key={mastery}>
        <td>{mastery}</td>
        <td>{itemChance}%</td>
        <td>{dropAmount}%</td>
      </tr>
    );
  });

  return (
    <div className="basic-items-data">

      <h2>Basic Items</h2>

      <div className="table-display">
        <table className="fixed-rows">
          <tbody>
            <tr>
              <th>Mastery</th>
              <th>Item Drop Chance</th>
              <th>Item Drop Amount</th>
            </tr>
          </tbody>
        </table>
        <div className="table-container">
          <table>
            <tbody>
              {basicItemDataRows}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
};

export default BasicItems;