/** @format */
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import LockPersonOutlined from '@mui/icons-material/LockPersonOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import React from 'react';
import { APP_ROUTES, SITE_DATA, LOADING } from '@/config';
import { isLoading } from '@/utils/get_loading_state';
import AuthLayout from '../components/layout';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import GoogleButton from '../components/google';

const Login = ({ handleLoginWithGoogle, handleLoginWithCredentials, logoUrl }) => {
	const { loading: loadingStore, redirect } = useSelector((state) => state);

	// ** PUSH 'redirectProps' TO REDIRECT STORE FOR AUTO NAVIGATION ON USER AUTH

	const [userData, setUserData] = React.useState({ email: '', password: '' });
	const { email, password } = userData;
	const [typePass, setTypePass] = React.useState(false);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleClickShowPassword = () => setTypePass(!typePass);
	const handleMouseDownPassword = (e) => e.preventDefault();

	const [errors, setErrors] = React.useState({});

	const handleSubmit = () => {
		setErrors({
			email: !email && 'Please enter your email.',
			password: !password && 'Please enter your password.',
		});
		if (errors.email || errors.password || !email || !password) return;
		if (isLoading(LOADING.LOGIN, loadingStore)) return;
		//handleLoginWithCredentials({ email, password });
	};

	return (
		<AuthLayout metatags={{ meta_title: `Login | ${SITE_DATA.OFFICIAL_NAME}` }} pageTitle={'Sign In to Your Account!'} logoUrl={logoUrl}>
			<TextField
				onChange={handleChangeInput}
				defaultValue={email}
				color='primary'
				className='w-full'
				style={{ margin: '10px 0' }}
				name='email'
				label='Email Address'
				variant='standard'
				helperText={errors.email}
				error={errors.email ? true : false}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<AccountCircleOutlined sx={{ color: SITE_DATA.THEME_COLOR }} />
						</InputAdornment>
					),
				}}
			/>

			<TextField
				onChange={handleChangeInput}
				defaultValue={password}
				className='w-full'
				style={{ margin: '10px 0' }}
				color='primary'
				name='password'
				label='Password'
				variant='standard'
				helperText={errors.password}
				error={errors.password ? true : false}
				type={typePass ? 'text' : 'password'}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<LockPersonOutlined sx={{ color: SITE_DATA.THEME_COLOR }} />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='start'>
								{typePass ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<div className={styles.forgot_pass}>
				<Link href={APP_ROUTES.FORGOT_PASSWORD} className={styles.forgot_pass_link}>
					{' '}
					Forgot Password?{' '}
				</Link>
			</div>

			<GoogleButton handleLoginWithGoogle={handleLoginWithGoogle} />

			<Button variant='outlined' onClick={handleSubmit} color='primary' className={`${styles.auth_btn} btn-animated`}>
				{isLoading(LOADING.LOGIN, loadingStore) && (
					<CircularProgress style={{ color: 'white', height: '20px', width: '20px', marginRight: '5px' }} />
				)}
				{!isLoading(LOADING.LOGIN, loadingStore) && 'Sign In!'}
			</Button>

			<div className='w-full flex items-center justify-center mb-5'>
				<Link href={APP_ROUTES.HOME} className={styles.home_link}>
					{' '}
					Back to Home{' '}
				</Link>
			</div>
		</AuthLayout>
	);
};

export default Login;
