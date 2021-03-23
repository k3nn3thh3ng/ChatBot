import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Boiler from '../Boiler';
import Status from '../Status';

const styles = (theme) => createStyles({
	background: {

	}
})

function Home(props) {
	
	return (
		<Boiler>
			<h1>
				Homepage
			</h1>
			<Status />
		</Boiler>
	);
	
}

export default withStyles(styles)(Home);