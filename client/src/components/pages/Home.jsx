import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { withStyles, createStyles } from '@material-ui/core/styles';

import Boiler from '../Boiler';
import Status from '../Status';
import Chat from '../Chat';


const ENDPOINT = "https://chatbox-api.run.goorm.io";

const styles = (theme) => createStyles({
	background: {

	}
})

function Home(props) {
	const [response, setResponse] = useState("");
	
	useEffect(() => {
		const socket = socketIOClient(ENDPOINT, {
			withCredentials: true,
			extraHeaders: {
				"my-custom-header": "abcd"
			}
		});
		socket.on("connect", () => {
			console.log("time handshake established")
		})
		socket.on("FromAPI", data => {
			console.log("Time Received")
			setResponse(data);
		});
		socket.on("connect_error", (err) => {
		  console.log(`connect_error due to ${err.message}`);
		});
		
		//Cleanup
		return () => socket.disconnect();
	}, []);
	
	return (
		<Boiler>
			<h1>
				Homepage
			</h1>
			It's <time dateTime={response}>{response}</time>
			<Status />
			<Chat />
		</Boiler>
	);
	
}

export default withStyles(styles)(Home);