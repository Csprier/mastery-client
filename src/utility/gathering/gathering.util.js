const gatheringUTIL = {
  createOptionHTMLElements: (items) => {
    return items.map(item => {
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
};

module.exports = gatheringUTIL;