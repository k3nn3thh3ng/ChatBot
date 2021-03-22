import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import API from '../apis';

const styles = (theme) => createStyles({
	background: {

	}
})

function Form(props) {
	const { classes } = props;
	const initialValues = {
		email: '',
		username: '',
		password: ''
	}
	const [values, setValues] = useState(initialValues);
	
	const handleInputChange = e => {
		const { name, value } = e.target;
		console.log(name);
		console.log(value);
		console.log(values);
		setValues({
			...values,
			[name]:value
		})
	}
	
	const preventDefault = (event) => {
		event.preventDefault()
	}
	
	const handleSubmit = async (event) => {
		const user = {
			username: values.username,
			password: values.password,
			email: values.email
		} 
		const response = await API.post(`${props.destination}`, { user })
		.then(res => {
			console.log(res);
			console.log(res.data);
		})
		//should add axios function to export enquiry
		setValues(initialValues);
		console.log(response)
	}
	
	return (
		<React.Fragment>
			<form className={classes.root} noValidate autoComplete="off" onSubmit={preventDefault}>
				<TextField
					name="email"
					id="email"
					label="Email"
					value={values.email}
					variant="outlined"
					onChange={handleInputChange}
					className={classes.formInput}
				/>
				<TextField
					name="username"
					id="username"
					label="Username"
					value={values.username}
					variant="outlined"
					onChange={handleInputChange}
					className={classes.formInput}
				/>
				<TextField
					name="password"
					id="password"
					label="password"
					type="password"
					value={values.password}
					variant="outlined"
					onChange={handleInputChange}
					className={classes.formInput}
				/>
				<Button variant="contained" disableElevation className={`${classes.button}`} onClick={handleSubmit}>
					Submit
				</Button>
			</form>
		</React.Fragment>
	);
	
}

export default withStyles(styles)(Form);