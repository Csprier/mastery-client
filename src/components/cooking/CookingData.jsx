import React, { useEffect, useState } from 'react';

// components
import CookingDiff from './CookingDiff';

// css
import './css/cooking-data.css';

function CookingData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);

  async function fetchAllCookingData() {
    const data = await fetch('http://localhost:8080/cooking')
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
      fetchAllCookingData();
    }
  }, [data, masteries]);

  return (
    <div className="cooking-data">
      <h1>Cooking Data!</h1>
      <CookingDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default CookingData;