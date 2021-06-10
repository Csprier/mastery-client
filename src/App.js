import { useEffect, useState } from 'react';
import './App.css';

import Gathering from './components/gathering/Gathering';

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
		</div>
	);
}

export default App;
