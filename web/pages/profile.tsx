import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import FormData from 'form-data';
import { useApi } from '../globals/hooks';
import EditProfileImage from '../components/users/EditProfileImage';

interface State {
	[index: string]: any;
}
const Profile = () => {
	const [img, setImg] = useState<File>();
	const [data, setData] = useState({
		name: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = { ...data };
		if (e.target.type === 'file') {
			setImg(e.target.files?.[0]);
		} else {
			s[e.target.name as keyof typeof s] = e.target.value;
		}
		setData(s);
		// console.log('CHANGE  ', img);
	};

	// FIX:
	// MULTIPART DATA AND JSON CANNOT BE SENT IN SAME REQUEST

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('SUBMIT  ', data);
		const form = new FormData();
		form.append('file', img);
		form.append('userData', data);
		// const res = await useApi(
		// 	{
		// 		method: 'POST',
		// 		url: '/users/update',
		// 		data: form,
		// 	},
		// 	{ 'Content-Type': 'multipart/form-data' }
		// );
		const token =
			sessionStorage.getItem('token') || localStorage.getItem('token');
		const res = await axios.post('/users/update', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token,
			},
		});
		console.log(res);
	};

	return (
		<div>
			<h1>Customize Your Profile</h1>
			<Link href="/users/edit">
				<a>Edit Profile</a>
			</Link>

			<h1>IMAGE</h1>
			<EditProfileImage />
		</div>
	);
};

export default Profile;

//

// testing GET IMAGE

// const [imageData, setImageData] = useState<any>('');
// useEffect(() => {
// 	(async () => {
// 		// const res = await axios.get('/users');
// 		const res = await useApi({
// 			method: 'GET',
// 			url: '/image',
// 			responseType: 'blob',
// 		});
// 		if (res.data) {
// 			const reader = new FileReader();
// 			reader.onload = () => {
// 				setImageData(reader.result);
// 			};
// 			reader.readAsDataURL(res.data);
// 			console.log(res);
// 		}
// 	})();
// }, []);

//  ___  TEST REQUEST ___
// useEffect(() => {
// 	(async () => {
// 		if (!img) return;
// 		// const img = require('./screen.jpg')
// 		const form = new FormData();

// 		form.append('file', img);
// 		form.append('filename', 'testimage');
// 		// console.log('FORM  ', form.get('filename'));

// 		const token =
// 			sessionStorage.getItem('token') || localStorage.getItem('token');

// 		const res = await axios.post('/users/upload', form, {
// 			headers: {
// 				'Content-Type': 'multipart/form-data',
// 				// Authorization: 'Bearer ' + token,
// 			},
// 		});
// 		console.log(res);
// 	})();
// }, [img]);

// const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	// ADD DYNAMIC FILENAME IN MULTER

// 	// console.log(e.target.files[0]);
// 	setImg(e.target.files[0]);
// };
