import React from 'react';

// css
import './css/home.css';
import logo from'./images/bdologo.png';
import darkknight from './images/darkknight.png';
import pegasus from './images/pegasus.png';
import sorceress from './images/sorceress.png';
import witch from './images/witch.png';

function Home(props) {
  return (
    <div className="home">
      <div className="images">
        <img src={pegasus} className="pegasus" alt="pegasus" />
        <img src={sorceress} className="sorceress" alt="sorceress" />
        <img src={logo} className="logo" alt="Logo" />
        <img src={witch} className="witch" alt="witch" />
        <img src={darkknight} className="darkknight" alt="darkknight" />
      </div>
      <div className="message-container">
        <p className="message">{props.message !== '' ? props.message : 'There is a problem...'}</p>
        <p className="description">Select a life skill, then select 2 masteries and see what you'll gain for increasing your brackets; or view the entire table!</p>
        <p className="disclaimer">*(This is not a mobile app)*</p>
      </div>
    </div>
  );
};

export default Home;