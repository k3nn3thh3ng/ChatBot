import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';

// import PlainAppbar from './PlainAppbar';

const styles = (theme) => createStyles({
	root: {
	}
})

function Boiler(props){
	// const {classes} = props
	
	const renderAppBar = (condition) => {
		if (condition) {
			// return <PlainAppbar />
		} return <AppBar />
	}

	return(
		<React.Fragment>
			{renderAppBar(props.plainAppBar)}
				{props.children}
		</React.Fragment>
	)
}

export default withStyles(styles)(Boiler);