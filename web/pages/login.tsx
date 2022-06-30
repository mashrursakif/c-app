import React from 'react';
import LoginForm from '../components/LoginForm';
import { Grid } from '@mui/material';

const Login = () => {
	return (
		<div className="background">
			<Grid
				container
				className="height-100"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item className="form-con" xs={12} sm={4}>
					<h1 className="mb-8">Login to your account</h1>
					<LoginForm />
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
