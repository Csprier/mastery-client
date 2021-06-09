import { useEffect, useState } from 'react';
import gatheringUTIL from '../../utility/gathering/gathering.util';

function OmniTable() {
  const [bi, setBasicItems] = useState([]);
  const [rr, setRareResources] = useState([]);
  const [sr, setSpecialResources] = useState([]);
  const [vr, setVeryRareResources] = useState([]);

  const OmniDATA = gatheringUTIL.getALLData();

  useEffect(() => {
    setBasicItems(OmniDATA.basicItems);
    // gatheringUTIL.fetchBasicItemData()
    //   .then((data) => setBasicItems(data.basicItems))
    //   .catch(e => console.error(e));
    // gatheringUTIL.fetchRareResourcesData()
    //   .then((data) => setRareResources(data.rareResources))
    //   .catch(e => console.error(e));
    // gatheringUTIL.fetchSpecialResourcesData()
    //   .then((data) => setSpecialResources(data.specialResources))
    //   .catch(e => console.error(e));
    // gatheringUTIL.fetchVeryRareResourcesData()
    //   .then((data) => setVeryRareResources(data.veryRareResources))
    //   .catch(e => console.error(e));
  }, [bi, rr, sr, vr]);

  console.log('bi', bi);

  return(
    <div>
      <h1>OmniTable!</h1>
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
            {/* {bi.length > 0 ? gatheringUTIL.buildTableCellsJsx(bi) : null} */}
            {/* {gatheringUTIL.buildTableCellsJsx(bi)}
            {gatheringUTIL.buildTableCellsJsx(rr)}
            {gatheringUTIL.buildTableCellsJsx(sr)}
            {gatheringUTIL.buildTableCellsJsx(vr)} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OmniTable;