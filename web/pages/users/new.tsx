import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserModel } from '../../globals/types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

import Link from 'next/link';
import { Grid } from '@mui/material';

interface UserData {
	user?: UserModel;
	token?: string;
	errors?: Record<string, string>;
}

const NewUser = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [newUser, setNewUser] = useState({
		username: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		country: '',
	});
	const [userData, setUserData] = useState<UserData>({});

	useEffect(() => {
		if (userData?.user && userData?.token) {
			// Add Login Function
			console.log('Created new user');
			let storage = sessionStorage;
			storage.setItem('token', userData.token);
			dispatch(setUser({ id: userData.user._id }));
			// router.push('/home');
			router.push('/profile');
		}
	}, [userData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = { ...newUser };
		s[e.target.name as keyof typeof s] = e.target.value;
		setNewUser(s);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await axios.post('/users/create', { userData: newUser });
		console.log(res);
		setUserData(res.data);
	};

	return (
		<div className="background">
			<Grid
				container
				className="height-100"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item className="form-con" xs={12} sm={6}>
					<h1 className="mb-8">Create New Account</h1>
					<div className="">
						<form onSubmit={handleSubmit}>
							<Grid container item className="input-con">
								<label htmlFor="username">Username</label>
								<br />
								<input
									type="username"
									id="username"
									className="input"
									name="username"
									onChange={handleChange}
								/>
								<p className="err-msg">{userData.errors?.['username'] || ''}</p>
							</Grid>
							<Grid container item className="input-con">
								<label htmlFor="email">Email</label>
								<br />
								<input
									type="email"
									id="email"
									className="input"
									name="email"
									onChange={handleChange}
								/>
								<p className="err-msg">{userData.errors?.['email'] || ''}</p>
							</Grid>
							<Grid container item className="input-con">
								<label htmlFor="password">Password</label>
								<br />
								<input
									type="password"
									id="password"
									className="input"
									name="password"
									onChange={handleChange}
								/>
								<p className="err-msg">{userData.errors?.['password'] || ''}</p>
							</Grid>

							<Grid
								container
								className=""
								justifyContent="center"
								alignItems="center"
								spacing={3}
							>
								<Grid item className="input-con" xs={6}>
									<label htmlFor="firstName">First Name</label>
									<br />
									<input
										type="firstName"
										id="firstName"
										className="input"
										name="firstName"
										onChange={handleChange}
									/>
									<p className="err-msg">
										{userData.errors?.['firstName'] || ''}
									</p>
								</Grid>
								<Grid item className="input-con" xs={6}>
									<label htmlFor="lastName">Last Name</label>
									<br />
									<input
										type="lastName"
										id="lastName"
										className="input"
										name="lastName"
										onChange={handleChange}
									/>
									<p className="err-msg">
										{userData.errors?.['lastName'] || ''}
									</p>
								</Grid>
							</Grid>

							<Grid container item className="input-con">
								<label htmlFor="country">Country</label>
								<br />
								<input
									type="country"
									id="country"
									className="input"
									name="country"
									onChange={handleChange}
								/>
							</Grid>

							<div className="">
								<button type="submit" className="btn">
									Save
								</button>
							</div>
						</form>
					</div>
					<div className="mt-8">
						<Link href="/login">
							<a>Login with existing account</a>
						</Link>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default NewUser;
