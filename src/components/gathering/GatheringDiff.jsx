import { useEffect, useState } from 'react';

function GatheringDiff(props) {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');

  useEffect(() => {
    if (m1.length !== 0 && m2.length !== 0) {
      doMath(m1, m2)
    }
  }, [m1, m2]);

  function setRange1() {
    let range = document.getElementById('m1').value;
    setM1(range);
  };
  function setRange2() {
    let range = document.getElementById('m2').value;
    setM2(range);
  };

  async function doMath(m1, m2) {
    const data = await fetch('http://localhost:8080/gathering')
      .then(res => res.json())
      .catch(e => console.error(e));
    let range = data.filter((bracket) => {
      return parseInt(bracket.mastery) === parseInt(m1) || parseInt(bracket.mastery) === parseInt(m2);
    });
    
  }

  const masteryOptionElementsStart = props.masteries.map(bracket => {
    return (
      <option 
        value={bracket.mastery}
        key={bracket.mastery}
        id={bracket.mastery}
      >
        {bracket.mastery}
      </option>
    )
  });

  const masteryOptionElementsStop = props.masteries.map(bracket => {
    return (
      <option 
        value={bracket.mastery}
        key={bracket.mastery}
        id={bracket.mastery}
      >
        {bracket.mastery}
      </option>
    )
  });

  return(
    <div className="gathering-diff">
      <select
        id="m1"
        onChange={setRange1}
      >
        <option>Select Mastery A</option>
        {masteryOptionElementsStart}
      </select>
      <select
        id="m2"
        onChange={setRange2}
      >
        <option>Select Mastery B</option>
        {masteryOptionElementsStop}
      </select>
    </div>
  );
};

export default GatheringDiff;