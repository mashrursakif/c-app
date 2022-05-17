import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from 'axios';

const Logout = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		sessionStorage.removeItem('token');
		localStorage.removeItem('token');
		dispatch(setUser({ id: '' }));
		router.push('/');
	}, []);

	return (
		<div>
			<h1>Logging Out</h1>
		</div>
	);
};

export default Logout;
