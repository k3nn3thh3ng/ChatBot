import { useState, useEffect } from 'react';

import API from '../apis';

function IsAuthenticated(trigger) {
	// const { classes } = props;
	const initialValues = {
		username: ''
	}

	const [values, setValues] = useState(initialValues);
	
	useEffect(() => {
		checkAuthenticate()
	}, [trigger])
	
	const checkAuthenticate = async (event) => {
		await API.get('/status')
		.then(res => {
			console.log(res);
			setValues({
				username: res.data.user.username
			})
		}).catch((error) => {
			console.log(error.response)
		})
	}
	
	return { username: values.username }
}

export default IsAuthenticated;