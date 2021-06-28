import React from 'react';

// css
import './css/home.css';
import logo from'./images/bdologo.png';

function Home() {
  return (
    <div className="home">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Home;