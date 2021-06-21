import React, { useEffect, useState }from 'react';

// components
import FishingDiff from './FishingDiff';

// css 
import './css/fishing-data.css';

function FishingData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);
  
  async function fetchAllFishingData() {
    const data = await fetch('http://localhost:8080/fishing')
      .then(res => res.json())
      .then(res => console.log('res', res))
      .catch(e => console.error(e));
    let masteriesData = data.map(bracket => {
      return { mastery: bracket.mastery }
    });
    setData(data);
    setMasteries(masteriesData);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchAllFishingData();
    }
  }, [data, masteries]);

  return (
    <div className="fishing-data">
      <h1>Fishing Data</h1>
      <FishingDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default FishingData;