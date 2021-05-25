import React from 'react';
// import { API_BASE_URL } from './utility/api-config';

const DbTestButton = () => {
  function testQuery() {
    return fetch('http://localhost:8080/greeting', 
      { mode: 'cors' }, 
      (response) => {
        console.log(response.data);
        response.json();
      })
    .catch(e => console.error(e));
  };

  return (
    <button onClick={() => testQuery()}>Test!</button>
  );
}

export default DbTestButton;