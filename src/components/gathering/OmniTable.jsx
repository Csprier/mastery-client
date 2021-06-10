import { useEffect, useState } from 'react';
import gatheringUTIL from '../../utility/gathering/gathering.util';

function GatheringData() {
  const [data, setData] = useState([]);
  async function fetchAllGatheringData() {
    const data = await fetch('http://localhost:8080/gathering')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(e => console.error(e));
    return data;
  }

  // const gatheringData = fetchAllGatheringData();
  // console.log('Gathering data:::', gatheringData);

  useEffect(() => {
    // fetchAllGatheringData();
  }, [data]);

  return(
    <div>
      <h1>Gathering Data!</h1>
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
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GatheringData;