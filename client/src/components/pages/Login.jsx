import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Boiler from '../Boiler';
import Form from '../Form';

const styles = (theme) => createStyles({
	background: {

	}
})

function Login(props) {
	
	return (
		<Boiler>
			<h1>
				Login
			</h1>
			<Form destination="/login"/>
		</Boiler>
	);
	
}

export default withStyles(styles)(Login);