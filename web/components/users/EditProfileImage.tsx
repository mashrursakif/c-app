import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { useApi, resizeFile } from '../../globals/hooks';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';

import { Modal, Fade, Backdrop, Grid } from '@mui/material';
import { FaPenAlt } from 'react-icons/fa';

interface Props {
	currentImage: string;
	setImage(imgUrl: string): void;
}
const EditProfileImage = ({ currentImage, setImage }: Props) => {
	const user = useSelector(getUser);

	const [file, setFile] = useState<File>();
	const [imgUrl, setImgUrl] = useState<string>('');
	const [imgName, setImgName] = useState<string>();

	const [error, setError] = useState<string>();

	const [open, setOpen] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files?.[0]);
		const reader = new FileReader();
		setImgName(e.target.files?.[0]?.name);
		reader.onload = () => {
			setImgUrl(reader.result as string);
		};
		reader.readAsDataURL(e.target.files?.[0] as File);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// const dir = `c-app/users/${user.id}`;

		const form = new FormData();
		form.append('file', file);

		const res = await useApi({
			method: 'POST',
			url: '/users/profile-img',
			data: form,
		});

		console.log(res);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<button className="btn-icon" onClick={handleOpen}>
				<FaPenAlt />
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby=""
				aria-describedby=""
			>
				<Fade in={open}>
					<Grid
						container
						className="height-100"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item className="form-con" xs={12} sm={6}>
							<h1 className="">Edit Profile Image</h1>
							<Grid container className="" justifyContent="center" item>
								<img
									className="profile-image"
									src={!imgUrl || imgUrl === '' ? currentImage : imgUrl}
								/>
							</Grid>
							<form onSubmit={handleSubmit}>
								<Grid container item>
									<label htmlFor="image-input" className="image-input">
										{imgName || 'Choose File'}
										<input
											type="file"
											id="image-input"
											onChange={handleChange}
										/>
									</label>
								</Grid>

								{error && (
									<div className="mt-8">
										<p className="err-msg">{error}</p>
									</div>
								)}

								<Grid
									container
									justifyContent="flex-end"
									alignItems="center"
									spacing={2}
								>
									<Grid item>
										<button
											type="button"
											className="btn secondary"
											onClick={handleClose}
										>
											Cancel
										</button>
									</Grid>
									<Grid item>
										<button type="submit" className="btn">
											Save
										</button>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Fade>
			</Modal>
		</>
	);
};

export default EditProfileImage;

/* 


	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const form = new FormData();
	// 	form.append('profile-img', file);
	// 	const res = await useApi(
	// 		{
	// 			method: 'POST',
	// 			url: '/users/profile-img',
	// 			data: form,
	// 		},
	// 		{ 'Content-Type': 'multipart/form-data' }
	// 	);
	// 	const imagePath = res.data.user.imagePath;
	// 	if (!imagePath || imagePath !== '') {
	// 		setImage(imgUrl);
	// 		handleClose();
	// 	} else {
	// 		setError('Error, unable to save file');
	// 	}
	// };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const dir = `c-app/users/${user.id}`;

		// get Cloudinary sign data
		const r = await axios.get('/upload-auth', { params: { dir } });
		const signData = r.data;

		if (!signData.signature) console.log('ERROR!!!');

		// Resize the image
		const f = await resizeFile(file as File);
		console.log('RESIZED   ', f);
		const form = new FormData();
		form.append('file', f);
		form.append('api_key', signData?.apiKey);
		form.append('timestamp', signData?.timestamp);
		form.append('signature', signData?.signature);
		form.append('folder', dir);

		const res = await axios({
			method: 'POST',
			url:
				'https://api.cloudinary.com/v1_1/' +
				signData.cloudname +
				'/auto/upload',
			data: form,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		console.log(res);
	};

*/
