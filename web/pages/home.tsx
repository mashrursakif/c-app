import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApi } from '../globals/hooks';

const Home = () => {
	const [user, setUser] = useState({});

	const [file, setFile] = useState<File>();
	const [sign, setSign] = useState({
		timestamp: '',
		signature: '',
		apiKey: '',
		cloudname: '',
	});

	useEffect(() => {
		(async () => {
			const r = await useApi({
				method: 'GET',
				url: '/upload-auth',
			});
			console.log('SIGN  ', r.data);
			setSign(r.data);
		})();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData();
		form.append('file', file as File);
		form.append('api_key', sign?.apiKey);
		form.append('timestamp', sign?.timestamp);
		form.append('signature', sign?.signature);
		form.append('folder', 'demo_folder');

		// useApi automatically sends auth header, ADD CONDITION to change
		// const res = await useApi(
		// 	{
		// 		method: 'POST',
		// 		url:
		// 			'https://api.cloudinary.com/v1_1/' + sign.cloudname + '/auto/upload',
		// 		data: form,
		// 	},
		// 	{ 'Content-Type': 'multipart/form-data' }
		// );

		const res = await axios({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/' + sign.cloudname + '/auto/upload',
			data: form,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('SAVING  ', res);
	};

	return (
		<div>
			<h1>...</h1>
			{/*<img style={{ width: '100px', height: '100px' }} src={img} />*/}
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files?.[0] as File);
					}}
				/>
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default Home;

// GET USER
// const [img, setImg] = useState('');
// const res = await useApi({
// 	method: 'GET',
// 	url: '/users/',
// });
// setUser(res.data.user);

// GET CLDN IMAGE

// const r = await useApi({
// 	method: 'GET',
// 	url: '/upload-auth',
// });
// console.log('SIGN  ', r.data);

// const imgRes = await useApi({
// 	method: 'GET',
// 	url:
// 		'https://res.cloudinary.com/dik522vqy/image/upload/v1656601214/samples/cloudinary-icon.png',
// 	// url: process.env.CLOUDINARY_URL as string,
// 	responseType: 'blob',
// });
// // console.log(img);
// const reader = new FileReader();
// reader.onload = () => {
// 	setImg(reader.result as string);
// };
// reader.readAsDataURL(imgRes.data);
