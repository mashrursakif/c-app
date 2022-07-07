import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setId } from '../redux/slices/userSlice';
import { useApi } from '../globals/hooks';

const Popup = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	// reroute if not logged in
	useEffect(() => {
		const token =
			sessionStorage.getItem('token') || localStorage.getItem('token');
		const allow = ['/', '/login', '/users/new'];

		if (!token || token === '') {
			if (!allow.includes(router.pathname)) {
				console.log('AUTH WORKS!!');
				router.push('/login');
			}
		}

		// Set Redux
		if (token && token !== '') {
			(async () => {
				const res = await useApi({
					method: 'GET',
					url: '/users',
				});
				console.log(res);
				dispatch(setId(res.data.user._id));
			})();
		}
	}, []);

	return <div></div>;
};

export default Popup;
