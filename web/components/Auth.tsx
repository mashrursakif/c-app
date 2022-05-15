import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = ({ children }: any) => {
	const [header, setHeader] = useState<string | null>('');

	useEffect(() => {
		const token =
			sessionStorage.getItem('token') || localStorage.getItem('token');
		axios.defaults.headers.common['Authorization'] = token
			? `Bearer ${token}`
			: '';
		setHeader(token);
	}, []);

	return <div>{header !== '' && children}</div>;
};

export default Auth;
