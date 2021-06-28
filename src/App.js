import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


// components
import Home from './components/home/Home';
import Alchemy from './components/alchemy/Alchemy';
import Cooking from './components/cooking/Cooking';
import Fishing from './components/fishing/Fishing';
import Gathering from './components/gathering/Gathering';
import Processing from './components/processing/Processing';
import Sailing from './components/sailing/Sailing';
import Training from './components/training/Training';

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
				<div className="navigation-container">
					<ul className="navigation-list">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/alchemy">Alchemy</Link>
						</li>
						<li>
							<Link to="/cooking">Cooking</Link>
						</li>
						<li>
							<Link to="/fishing">Fishing</Link>
						</li>
						<li>
							<Link to="/gathering">Gathering</Link>
						</li>
						<li>
							<Link to="/processing">Processing</Link>
						</li>
						<li>
							<Link to="/sailing">Sailing</Link>
						</li>
						<li>
							<Link to="/training">Training</Link>
						</li>
					</ul>
				</div>
				<Switch>
					<Route exact path="/">
						<Home message={message} />
					</Route>
					<Route path="/alchemy">
						<Alchemy />
					</Route>
					<Route path="/cooking">
						<Cooking />
					</Route>
					<Route path="/fishing">
						<Fishing />
					</Route>
					<Route path="/gathering">
						<Gathering />
					</Route>
					<Route path="/processing">
						<Processing />
					</Route>
					<Route path="/sailing">
						<Sailing />
					</Route>
					<Route path="/training">
						<Training />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
