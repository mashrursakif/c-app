import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApi } from '../globals/hooks';

const Home = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
		(async () => {
			const res = await useApi({
				method: 'GET',
				url: '/users/',
			});
			setUser(res.data.user);
			console.log(res);
		})();
	}, []);

	return (
		<div>
			<h1>Welcome to Cookie Cat</h1>
		</div>
	);
};

export default Home;
