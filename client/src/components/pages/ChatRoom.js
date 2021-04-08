import React from "react";
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Grid, 
		Typography, 
		Button,
		List,
		ListItem,
		ListItemAvatar,
		ListItemText,
		Avatar,
		Icon,
		InputBase
	   } 
from '@material-ui/core';

import useChat from "../useChat";
import IsAuthenticated from '../IsAuthenticated';


const styles = (theme) => createStyles({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
 	},
	chatRoomContainer: {
		maxWidth: '1080px',
		border: 'solid 1px #f0f0f0',
		height: '100vh',
		'&::-webkit-scrollbar': {
			width: '0em'
		},
	},
	messageContainer: {
		flexGrow: '1',
		height: '50%',
		
	},
	messageWrapper: {
		height: '100%',
		overflowY: "auto",
		margin: 0,
		padding: 0,
		listStyle: "none",
		'&::-webkit-scrollbar': {
			width: '0.4em'
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(247,247,247,1)',
			outline: '1px solid #f7f7f7'
		}
	},
	chatRoomBar: {
		height: theme.spacing(8),
		background: '#e6e6e6',
		padding: theme.spacing(2,0,2,2)
	},
	inputBar: {
		flexGrow: '1',
		background: 'white',
		borderRadius: theme.spacing(2),
		padding: theme.spacing(0,2)
	},
	inputButton: {
		'&:hover' : {
			background: 'none',
		}
	},
	myMessage: {
		flexDirection: 'row-reverse',
		width: 'auto'
	},
})

function ChatRoom(props) {
	const { username } = IsAuthenticated(true);
	const roomId = props.username || username;
	const { messages, sendMessage } = useChat(roomId);
	const [ newMessage, setNewMessage ] = React.useState("");
	const { classes } = props
	
	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		sendMessage(newMessage, roomId);
		setNewMessage("");
	};
	
	const checkMessage = (e) => {
		if (e.createdBy[0].username === username) {
			return (
				classes.myMessage
			)
		}
		return (
			classes.receivedMessage
		)
	}

	return (
		<Grid container direction="column" className={classes.chatRoomContainer}>
			<Grid container className={classes.chatRoomBar} alignItems="center">
				<Typography variant="body1" className="room-name">
					Room Name: {roomId}
				</Typography>
			</Grid>
			<Grid container className={classes.messageContainer}>
				<Grid container direction="column-reverse" className={classes.messageWrapper}>
					<List className="messages-list">
						{messages.map((message, i) => (
							<Grid 
								key={i}
								container
								className={checkMessage(message)}
							>
								<ListItem
									className={checkMessage(message)}
								>
									<ListItemAvatar>
										<Avatar>
											<Icon fontSize="large" color="inherit" className={`fas fa-home ${classes.homeIcon}`}/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText 
										primary={`${message.createdBy[0].username}`}
										secondary={message.message}
									/>
								</ListItem>
							</Grid>
						))}
					</List>
				</Grid>
			</Grid>
			<form>
				<Grid container wrap="nowrap" className={classes.chatRoomBar}>
					<Grid container className={classes.inputBar}>
						<InputBase
							className={classes.input}
							placeholder="Type a message"
							inputProps={{ 'aria-label': 'Type a message' }}
							value={newMessage}
							onChange={handleNewMessageChange}
						/>
					</Grid>
					<Button onClick={handleSendMessage} className={classes.inputButton} type="submit">
						<Icon fontSize="small" color="inherit" className={`fas fa-paper-plane`}/>
					</Button>
				</Grid>
			</form>
		</Grid>
	);
};

export default withStyles(styles)(ChatRoom);