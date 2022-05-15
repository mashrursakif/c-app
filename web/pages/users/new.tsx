import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { UserModel } from '../../globals/types';
import { useRouter } from 'next/router';

interface UserData {
	user?: UserModel;
	errors?: Record<string, string>;
}

const NewUser = () => {
	const router = useRouter();

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
		if (userData?.user) {
			// Add Login Function
			console.log('Created new user');
			// router.push('/profile');
			router.push('/login');
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
		<div>
			<h1>Create New Account</h1>
			<form onSubmit={handleSubmit}>
				<div className="">
					<label htmlFor="username">Username</label>
					<br />
					<input
						type="username"
						id="username"
						name="username"
						onChange={handleChange}
					/>
					<p className="err-msg">{userData.errors?.['username'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="email">Email</label>
					<br />
					<input type="email" id="email" name="email" onChange={handleChange} />
					<p className="err-msg">{userData.errors?.['email'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleChange}
					/>
					<p className="err-msg">{userData.errors?.['password'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="firstName">First Name</label>
					<br />
					<input
						type="firstName"
						id="firstName"
						name="firstName"
						onChange={handleChange}
					/>
					<p className="err-msg">{userData.errors?.['firstName'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="lastName">Last Name</label>
					<br />
					<input
						type="lastName"
						id="lastName"
						name="lastName"
						onChange={handleChange}
					/>
					<p className="err-msg">{userData.errors?.['lastName'] || ''}</p>
				</div>
				<div className="">
					<label htmlFor="country">Country</label>
					<br />
					<input
						type="country"
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
			<Link href="/login">
				<a>Login with existing account</a>
			</Link>
		</div>
	);
};

export default NewUser;
