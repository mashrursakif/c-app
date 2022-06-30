import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { useApi } from '../globals/hooks';
import { UserModel } from '../globals/types';

import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import EditProfileImage from '../components/users/EditProfileImage';
import { Grid } from '@mui/material';

import { FaUser, FaImage } from 'react-icons/fa';

interface State {
	[index: string]: any;
}
const Profile = () => {
	const [img, setImg] = useState('');
	const [user, setUser] = useState<UserModel>();

	useEffect(() => {
		(async () => {
			const res = await useApi({
				method: 'GET',
				url: '/users/',
			});
			setUser(res.data.user);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (user?._id && user.imagePath) {
				const res = await useApi({
					method: 'GET',
					url: '/image',
					params: {
						path: user.imagePath,
					},
					responseType: 'blob',
				});
				if (res.data) {
					const reader = new FileReader();
					reader.onload = () => {
						setImg(reader.result as string);
					};
					reader.readAsDataURL(res.data);
				}
			}
		})();
	}, [user]);

	return (
		<>
			<Sidebar />
			<div className="container">
				<h1>Customize Your Profile</h1>
				<Link href="/users/edit">
					<a>Edit Profile</a>
				</Link>

				<Grid container justifyContent="center">
					<Grid item>
						<div className="edit-image-con">
							<img className="profile-image" src={img || '/image-icon.png'} />
							<EditProfileImage
								currentImage={img || '/image-icon.png'}
								setImage={setImg}
							/>
						</div>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" alignItems="center" spacing={2}>
					<Grid item>
						<h2 className="font-12 mt-12">{user?.fullName || 'loadng...'}</h2>
					</Grid>
				</Grid>
			</div>
		</>
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
