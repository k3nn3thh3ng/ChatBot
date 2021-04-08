import { useEffect, useState } from "react";
import API from '../apis';


function GetChannelList(location) {
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		const checkChannels = async (location) => {
			await API.get(`/${location}`)
			.then(res => {
				console.log(res.data);
				setChannels(() => [...res.data.channels])
			}).catch((error) => {
				console.log(error)
			})
		}
		checkChannels(location)
	}, [location]);

	return { channels };
};

export default GetChannelList;