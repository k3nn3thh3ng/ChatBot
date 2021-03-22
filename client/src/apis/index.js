import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://chatbox-api.run.goorm.io/api',
	withCredentials: true
});



export default instance