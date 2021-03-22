import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route path="/user/login">
					<Login />
				</Route>
				<Route path="/user/register">
					<Register />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
