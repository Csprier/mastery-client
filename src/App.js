import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


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
		<Router>
			<div className='App'>
				<h1>Mastery Look-up</h1>
				<p className="message">{message !== '' ? message : 'There is a problem...'}</p>
				<div>
					<ul>
						<li>
							<Link to="/gathering">Gathering</Link>
						</li>
						<li>
							<Link to="/cooking">Cooking</Link>
						</li>
					</ul>
				</div>
				<Switch>
					<Route path="/gathering">
						<Gathering />
					</Route>
					<Route path="/cooking">
						<Cooking />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
