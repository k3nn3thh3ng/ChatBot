import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = (theme) => createStyles({
	background: {

	}
})

function Chat(props) {

	const [roomName, setRoomName] = React.useState("");

	const handleRoomNameChange = (event) => {
		setRoomName(event.target.value);
	};

	return (
		<div className="home-container">
			<input
				type="text"
				placeholder="Room"
				value={roomName}
				onChange={handleRoomNameChange}
				className="text-input-field"
			/>
			<Link to={`/ChatRoom`} className="enter-room-button">
				Join room
			</Link>
		</div>
	);
    
}

export default withStyles(styles)(Chat);