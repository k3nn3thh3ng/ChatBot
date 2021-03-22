import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, 
		Toolbar, 
		Typography, 
		Button, 
		Icon } 
from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	homeIcon: {
		height: 'auto',
		width: 'auto',
		margin: theme.spacing(0,1.5,0,0)
	},
	title: {
		flexGrow: 1,
	},
	link: {
		color: 'inherit',
		textDecoration: 'none',
		height: '100%'
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
	<div className={classes.root}>
		<AppBar position="static">
			<Toolbar>
				<Link to="/" className={classes.link}>
					<Icon fontSize="large" color="inherit" className={`fas fa-home ${classes.homeIcon}`}  />
				</Link>
				<Typography variant="h6" className={classes.title}>
					Home
				</Typography>
				<Link to="/user/register" className={classes.link}>
					<Button color="inherit">Register</Button>
				</Link>
				<Link to="/user/login" className={classes.link}>
					<Button color="inherit">Login</Button>
				</Link>
				<Button color="inherit">Logout</Button>
			</Toolbar>
		</AppBar>
	</div>
	);
}