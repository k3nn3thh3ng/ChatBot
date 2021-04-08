import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import ChatButton from './ChatButton';
import IsAuthenticated from './IsAuthenticated';

const styles = (theme) => createStyles({
	background: {
	}
})

function Status(props) {
	// const { classes } = props;
	
	const [ rerender, setRerender ] = useState(false);
	
	const { username } = IsAuthenticated(rerender);

	
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
	
	const checkAuth = () => {
		setRerender(!rerender)
	}
	
	const original = [5,6,3,9,-1]
	const question2 = [113,24,-52,98,102,-42,-23,9,192] 
	const question2n = 8
	
	const calculate = (data) => {
		var newdata = [];
		var i;
		for (i=1; i<data.length ; i++) {
			var results = data[i] - data[i-1]
			newdata.push(results)
		}
		return newdata;
	}
	
	const repeat = (n, data) => {
		var i;
		for (i=0; i<n ; i++) {
			data = calculate(data)
		}
		return data
	}
	
	const exercise2data = ["red","red","yellow","yellow","yellow","yellow","blue","red","red"]
	
	const checkLongest = (data) => {
		var i;
		var finalCount= 0;
		var finalColour = '';
		var nowCount= 1;
		var nowColour = '';
		for(i=1; i<data.length; i++) {
			if (data[i] === data[i-1]) {
				nowCount++;
				nowColour = data[i]
				if (nowCount>finalCount) {
					finalCount = nowCount
					finalColour = nowColour
					console.log(finalCount)
				}
			} else {
				nowCount = 1
				nowColour = ''
			}
		}
		console.log(finalColour)
		const result = {count: finalCount, colour: finalColour}
		return result
	}
	// array1.map(x => x * 2)
	// const checkLongest2 = (data) => {
	// 	data.map((data,index) => {
	// 		if(data[index] === data[index-]
	// 	})
	// }
	return (
		<React.Fragment>
			{renderInformation(username)}
			<ChatButton username={username} checkAuth={checkAuth}/>
			<Typography>
				{console.log(checkLongest(exercise2data))}
			</Typography>
		</React.Fragment>
	);
	
}

export default withStyles(styles)(Status);