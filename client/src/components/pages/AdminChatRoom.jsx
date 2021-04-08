import React, { useState } from "react";
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Grid, 
		Typography
	   } 
from '@material-ui/core';

import getChannelList from "../getChannelList";
import ChatRoom from "./ChatRoom";
// import IsAuthenticated from '../IsAuthenticated';


const styles = (theme) => createStyles({
	channelListContainer: {
		
	}
})

function AdminChatRoom(props) {
	
	const { classes } = props;
	const location = 'channels';
	const { channels } = getChannelList(location);
	
	const [roomId, setRoomId] = useState('');
	
	const handleClick = (channelId) => {
		return () => {setRoomId(channelId)}
	}
	
	const renderData = (channelList) => {
		return channelList.map((channel) => {
			const event = new Date(channel.updated)
			
			return (
				<Grid container direction="column" key={channel.name} onClick={handleClick(channel.name)}>
					<Typography variant="body1">
						{channel.name}
					</Typography>
					<Typography variant="body2">
						{event.toUTCString()}
					</Typography>
				</Grid>
			)
		})
	}
	
	return (
		<Grid container justify="center">
			<Grid item xs={2} container direction="column" className={classes.channelListContainer}>
				{renderData(channels)}
			</Grid>
			<Grid item xs={9} container>
				<ChatRoom username={roomId}/>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(AdminChatRoom);