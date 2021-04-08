import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Icon, IconButton } from '@material-ui/core';

import API from '../apis';

const styles = (theme) => createStyles({
	background: {
	}
})

function ChatButton(props) {
	// const { classes } = props;

	const handleClick = async (event) => {
		await API.post('/setpublic', {
		})
		.then(res => {
			console.log(res.data);
		})
		.catch(err => {
			console.log('failed to send data', err)
		})
		props.checkAuth()
	}
	
	return (
		<React.Fragment>
			<IconButton aria-label="delete" color="primary" onClick={handleClick}>
				<Icon fontSize="small" color="inherit" className={`fas fa-paper-plane`} />
			</IconButton>
		</React.Fragment>
	);
	
}

export default withStyles(styles)(ChatButton);