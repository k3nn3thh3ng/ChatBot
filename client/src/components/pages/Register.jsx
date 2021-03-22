import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Boiler from '../Boiler';
import Form from '../Form';

const styles = (theme) => createStyles({
	background: {

	}
})

function Register(props) {
	
	return (
		<Boiler>
			<h1>
				Register
			</h1>
			<Form destination="/user" />
		</Boiler>
	);
	
}

export default withStyles(styles)(Register);