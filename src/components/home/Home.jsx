import React from 'react';

// css
import './css/home.css';
import logo from'./images/bdologo.png';
import pegasus from './images/pegasus.png';
import witch from './images/witch.png';

function Home(props) {
  return (
    <div className="home">
      <div className="images">
        <img src={pegasus} className="pegasus" alt="pegasus" />
        <img src={logo} className="logo" alt="Logo" />
        <img src={witch} className="witch" alt="witch" />
      </div>
      <div className="message-container">
        <p className="message">{props.message !== '' ? props.message : 'There is a problem...'}</p>
        <p>Select a life skill, then select 2 masteries and see what you'll gain for increasing your mastery; or view the entire table!</p>
      </div>
    </div>
  );
};

export default Home;