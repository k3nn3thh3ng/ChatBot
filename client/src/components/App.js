import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';
import AdminChatRoom from './pages/AdminChatRoom';

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Switch>
				<Route path="/user/login">
					<Login />
				</Route>
				<Route path="/user/register">
					<Register />
				</Route>
				<Route exact path="/ChatRoom">
					<ChatRoom />
				</Route>
				<Route exact path="/AdminChatRoom">
					<AdminChatRoom />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
