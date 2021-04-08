import {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import API from '../apis';

const useAxiosFetch = (url, timeout) => {
	const [data, setData] = useState<AxiosResponse | null>(null);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unmounted = false;
		let source = axios.CancelToken.source();
		API.get(url, {
			cancelToken: source.token,
			timeout: timeout || 5000
		})
			.then(res => {
				if (!unmounted) {
					// @ts-ignore
					setData(res.data);
					setLoading(false);
				}
			}).catch(function (e) {
			if (!unmounted) {
				setError(true);
				setErrorMessage(e.message);
				setLoading(false);
				if (axios.isCancel(e)) {
					console.log(`request cancelled:${e.message}`);
				} else {
					console.log("another error happened:" + e.message);
				}
			}
		});
		return function () {
			unmounted = true;
			source.cancel("Cancelling in cleanup");
		};
	}, [url, timeout]);

	return {data, loading, error, errorMessage};
};

export default useAxiosFetch;