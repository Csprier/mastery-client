import React, { useEffect, useState }from 'react';

// components
import AlchemyDiff from './AlchemyDiff';

// css 
import './css/alchemy-data.css';

function AlchemyData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);

  async function fetchAllAlchemyData() {
    const data = await fetch('http://localhost:8080/alchemy')
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
      fetchAllAlchemyData();
    }
    console.log('masteries:', masteries);
  }, [data, masteries]);

  return (
    <div className="alchemy-data">
      <h2>Alchemy</h2>
      <AlchemyDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default AlchemyData;