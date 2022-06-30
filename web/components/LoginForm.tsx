import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AxiosRes } from '../globals/types';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

interface Props {
	show?: boolean;
	hideForm?(): void;
}
interface LoginData {
	token?: string;
	userId?: string;
	category?: string;
}

const LoginForm = ({ show = true, hideForm }: Props) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});
	const [rememberMe, setRememberMe] = useState(false);

	const [loginData, setLoginData] = useState<LoginData>({});

	useEffect(() => {
		if (loginData.token) {
			let storage = sessionStorage;
			if (rememberMe) storage = localStorage;
			storage.setItem('token', loginData.token);
			dispatch(setUser({ id: loginData.userId }));
			router.push('/home');
		}
	}, [loginData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = { ...login };
		s[e.target.name as keyof typeof s] = e.target.value;
		setLogin(s);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await axios.post('/users/login', {
			loginData: login,
		});
		setLoginData(res.data);
	};

	return (
		<div className={`${show ? '' : 'hide'}`}>
			<form onSubmit={handleSubmit}>
				<div className="">
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="email"
						className="input"
						id="email"
						name="email"
						value={login.email}
						onChange={handleChange}
					/>
				</div>
				<div className="">
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="password"
						className="input"
						id="password"
						name="password"
						value={login.password}
						onChange={handleChange}
					/>
				</div>
				<div className="mt-4 rememberMe">
					<input
						type="checkbox"
						id="rememberMe"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
					<label htmlFor="rememberMe">Remember Me</label>
				</div>
				<div className="mt-4">
					<p
						className={`err-msg ${
							loginData?.category === 'auth' ? '' : 'hide'
						}`}
					>
						Invalid email or password
					</p>
				</div>
				<div className="mt-4">
					<button type="submit" className="btn">
						Login
					</button>
				</div>
			</form>
			<div className="mt-8">
				<Link href="/users/new">
					<a>Create new account</a>
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;

/*
<button className={`${show ? 'hide' : ''}`} onClick={() => hideForm?.()}>
        x
      </button>
      <h1>Login</h1>
*/
