import React, { useEffect, useState } from 'react';

// components
import TrainingDiff from './TrainingDiff';

// css
import './css/training-data.css'

function TrainingData() {
  const [data, setData] = useState([]);
  const [masteries, setMasteries] = useState([]);

  async function fetchAllTrainingData() {
    const data = await fetch('http://localhost:8080/training')
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
      fetchAllTrainingData();
    }
  }, [data, masteries]);

  return (
    <div className="training-data">
      <h2>Training Data</h2>
      <TrainingDiff 
        data={data}
        masteries={masteries}
      />
    </div>
  );
};

export default TrainingData;