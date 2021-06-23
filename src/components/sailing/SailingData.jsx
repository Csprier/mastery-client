import React, { useEffect, useState }from 'react';

// components
import SailingDiff from './SailingDiff';

// css
import './css/sailing-data.css';

function SailingData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);

  async function fetchAllSailingData() {
    const data = await fetch('http://localhost:8080/sailing')
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
      fetchAllSailingData();
    }
  }, [data, masteries]);

  return (
    <div className="sailing-data">
      <h1>Sailing Data</h1>
      <SailingDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default SailingData;