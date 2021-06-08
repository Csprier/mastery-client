import { useState } from 'react';

import './gathering.css';

function GatheringData() {
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

  let basicItemElements = basicItems.map(item => {
    const { mastery, itemChance, dropAmount } = item;
    return (
      <div key={mastery} className="basic-item">
        <p>Mastery: {mastery}</p>
        <p>Item Drop Chance: {itemChance}%</p>
        <p>Item Drop Amount: {dropAmount}%</p>
      </div>
    );
  });

  return(
    <div className="basic-items-data">
      <h2>Basic Items</h2>
      <button onClick={() => fetchBasicItemData()}>GET</button>
      <div className="bid-display">{basicItems ? basicItemElements : 'Data has not been retrieved.'}</div>
    </div>
  );
};

export default GatheringData;