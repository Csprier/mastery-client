const gatheringUTIL = {
  fetchBasicItemData: async function() {
    const res = await fetch('http://localhost:8080/gathering/basic-items')
      .then(res => res.json())
      .catch(e => console.error(e));
    return res;
  },
  fetchRareResourcesData: async function() {
    const res = await fetch('http://localhost:8080/gathering/rare-resources')
      .then(res => res.json())
      .catch(e => console.error(e));
    return res;
  },
  fetchSpecialResourcesData: async function() {
    const res = await fetch('http://localhost:8080/gathering/special-resources')
      .then(res => res.json())
      .catch(e => console.error(e));
    return res;
  },
  fetchVeryRareResourcesData: async function() {
    const res = await fetch('http://localhost:8080/gathering/very-rare-resources')
      .then(res => res.json())
      .catch(e => console.error(e));
    return res;
  },

  getALLData: function() {
    const bi = this.fetchBasicItemData();
    const rr = this.fetchRareResourcesData();
    const sr = this.fetchSpecialResourcesData();
    const vr = this.fetchVeryRareResourcesData();
    console.log('ALL DATA:', {
      basicItems: bi,
      rareResources: rr,
      specialResources: sr,
      veryRareResources: vr
    });
    return {
      basicItems: bi,
      rareResources: rr,
      specialResources: sr,
      veryRareResources: vr
    }
  },

  buildTableCellsJsx: function(data) {
    return data.map(item => {
      const { mastery, itemChance, dropAmount } = item;
      return (
        <tr key={mastery}>
          <td>{mastery}</td>
          <td>{itemChance}%</td>
          <td>{dropAmount}%</td>
        </tr>
      );
    });
  }
}

export default gatheringUTIL;