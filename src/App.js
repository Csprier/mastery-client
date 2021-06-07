import './App.css';
import { useEffect, useState } from 'react';

function App() {
	const [message, setMessage] = useState('');

	async function fetchGreeting() {
		const res = await fetch('http://localhost:8080/greeting').then((res) =>
			res.json()
		);
		console.log('RES:::', res);
		setMessage(res.message);
	}

	useEffect(() => {
		fetchGreeting();
	}, [message]);

	return (
		<div className='App'>
			<h1>Mastery Look-up</h1>
			<p className="message">{message !== '' ? message : 'There is a problem...'}</p>
		</div>
	);
}

export default App;
