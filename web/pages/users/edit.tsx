import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { UserModel } from '../../globals/types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useApi } from '../../globals/hooks';

interface EditData {
	user?: UserModel;
	errors?: Record<string, string>;
}

const Profile = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const userObject = {
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		country: '',
		image: '',
	};

	const [user, setUser] = useState(userObject);
	const [editData, setEditData] = useState<EditData>({});

	// Get User
	useEffect(() => {
		(async () => {
			const res = await useApi({
				method: 'GET',
				url: '/users',
			});
			if (res.data) setUser(res.data.user);
		})();
	}, []);

	useEffect(() => {
		if (editData?.user) {
			router.push('/profile');
		}
	}, [editData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = { ...user };
		s[e.target.name as keyof typeof s] = e.target.value;
		setUser(s);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await useApi({
			method: 'POST',
			url: '/users/update',
			data: { userData: user },
		});
		setEditData(res.data);
	};

	return (
		<div>
			<h1>Edit Profile</h1>

			<form onSubmit={handleSubmit}>
				<div className="">
					<label htmlFor="username">Username</label>
					<br />
					<input
						type="username"
						value={user.username}
						id="username"
						name="username"
						onChange={handleChange}
					/>
					<p className="err-msg">{editData.errors?.['username'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="email"
						value={user.email}
						id="email"
						name="email"
						onChange={handleChange}
					/>
					<p className="err-msg">{editData.errors?.['email'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="firstName">First Name</label>
					<br />
					<input
						type="firstName"
						value={user.firstName}
						id="firstName"
						name="firstName"
						onChange={handleChange}
					/>
					<p className="err-msg">{editData.errors?.['firstName'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="lastName">Last Name</label>
					<br />
					<input
						type="lastName"
						value={user.lastName}
						id="lastName"
						name="lastName"
						onChange={handleChange}
					/>
					<p className="err-msg">{editData.errors?.['lastName'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="country">Country</label>
					<br />
					<input
						type="country"
						value={user.country}
						id="country"
						name="country"
						onChange={handleChange}
					/>
				</div>
				<div className="">
					<button type="submit" className="">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
