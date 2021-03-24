import React, { useState, useEffect } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import API from '../apis';

const styles = (theme) => createStyles({
	background: {
	}
})

function Status(props) {
	// const { classes } = props;
	const initialValues = {
		username: ''
	}

	const [values, setValues] = useState(initialValues);
	
	useEffect(() => {
		checkAuthenticate()
	}, [values.username])
	
	const checkAuthenticate = async (event) => {
		await API.get('/status')
		.then(res => {
			console.log(res);
			console.log(res.data);
			setValues({
				username: res.data.user.username
			})
		})
		//should add axios function to export enquiry
		
	}
	
	const renderInformation = (condition) => {
		if (condition) {
			return (
				<Typography>
					Welcome, {`${condition}`}
				</Typography>
			)
		} else {
			return (
				<Typography>
					There is no authenticated user
				</Typography>
			)
		}
	}
	
	return (
		<React.Fragment>
			{renderInformation(values.username)}
		</React.Fragment>
	);
	
}

export default withStyles(styles)(Status);