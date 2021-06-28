import React from 'react';

// css
import './css/home.css';
import logo from'./images/bdologo.png';

function Home(props) {
  console.log(props);
  return (
    <div className="home">
      <img src={logo} alt="Logo" />
      <div className="message-container">
        <p className="message">{props.message !== '' ? props.message : 'There is a problem...'}</p>
        <p>Select a life skill, then select 2 masteries and see what you'll gain for increasing your mastery!</p>
      </div>
    </div>
  );
};

export default Home;