import React, { useEffect, useState } from 'react';

// components
import Cooking from './components/cooking/Cooking';
import Gathering from './components/gathering/Gathering';

// css
import './App.css';

function App() {
	const [message, setMessage] = useState('');

	async function fetchGreeting() {
		const res = await fetch('http://localhost:8080/greeting')
			.then((res) =>
				res.json()
			);
		// console.log('RES:::', res);
		setMessage(res.message);
	}

	useEffect(() => {
		fetchGreeting();
	}, [message]);

	return (
		<div className='App'>
			<h1>Mastery Look-up</h1>
			<p className="message">{message !== '' ? message : 'There is a problem...'}</p>
			<Gathering />
			<Cooking />
		</div>
	);
}

export default App;
