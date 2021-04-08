import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import API from '../apis';

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "https://chatbox-api.run.goorm.io";

function UseChat(roomId) {
	const [messages, setMessages] = useState([]);

	const socketRef = useRef();

	useEffect(() => {
		checkMessageHistory(roomId);
		
		socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
  			query: { roomId },
			withCredentials: true,
			extraHeaders: {
				"my-custom-header": "abcd"
			}
		});

		socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
  			const incomingMessage = {
				...message,
				ownedByCurrentUser: message.createdBy === roomId,
			};
			setMessages((messages) => [...messages, incomingMessage]);
			console.log(message)
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, [roomId]);

	const checkMessageHistory = async (event) => {
		if (!event) {
			return console.log('first render')
		}
		await API.get(`/channel/${event}`)
		.then(res => {
			console.log(res.data);
			setMessages((messages) => [...res.data.messageHistory.message])
		}).catch((error) => {
			console.log(error)
		})
	}
	
	const sendMessage = (messageBody, channelId) => {
		socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
			message: messageBody,
			channelId: channelId
		});
	};

	return { messages, sendMessage };
};

export default UseChat;