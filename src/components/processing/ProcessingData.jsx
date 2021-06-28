import React, { useEffect, useState }from 'react';

// components
import ProcessingDiff from './ProcessingDiff';

// css
import './css/processing-data.css';

function ProcessingData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);

  async function fetchAllProcessingData() {
    const data = await fetch('http://localhost:8080/processing')
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
      fetchAllProcessingData();
    }
  }, [data, masteries]);

  return (
    <div className="processing-data">
      <h2>Processing</h2>
      <ProcessingDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default ProcessingData;