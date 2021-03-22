import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Boiler from '../Boiler';

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
		</Boiler>
	);
	
}

export default withStyles(styles)(Home);