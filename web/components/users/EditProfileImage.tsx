import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { useApi } from '../../globals/hooks';

interface Props {
	show?: boolean;
}
const EditProfileImage = ({ show }: Props) => {
	const [image, setImage] = useState<File>();
	const [imgUrl, setImgUrl] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files?.[0]);
		const reader = new FileReader();
		reader.onload = () => {
			setImgUrl(reader.result as string);
		};
		reader.readAsDataURL(e.target.files?.[0] as File);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData();
		form.append('profile-img', image);
		const res = await useApi(
			{
				method: 'POST',
				url: '/users/profile-img',
				data: form,
			},
			{ 'Content-Type': 'multipart/form-data' }
		);
	};

	return (
		<div className={show ? '' : ''}>
			<img style={{ width: '300px' }} src={imgUrl || ''} />
			<form onSubmit={handleSubmit}>
				<input type="file" onChange={handleChange} />
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default EditProfileImage;
