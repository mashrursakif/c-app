import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Popup = () => {
	const router = useRouter();

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
	}, []);

	return <div></div>;
};

export default Popup;
