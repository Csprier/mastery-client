import { useEffect, useState } from 'react';
import gatheringUTIL from '../../utility/gathering/gathering.util';

function OmniTable() {

  useEffect(() => {
   
  }, []);


  return(
    <div>
      <h1>OmniTable!</h1>
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

export default OmniTable;