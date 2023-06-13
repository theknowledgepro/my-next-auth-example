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
import React, { useEffect } from 'react';
import { APP_ROUTES, SITE_DATA, LOADING } from '@/config';
import { isLoading } from '@/utils/get_loading_state';
import AuthLayout from '../components/layout';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import GoogleButton from '../components/google';
import { GLOBALTYPES } from '@/redux/types';

const Login = ({ redirectProps, handleLoginWithGoogle, handleLoginWithCredentials, logoUrl }) => {
	const { loading: loadingStore, redirect } = useSelector((state) => state);
	const dispatch = useDispatch();
	// ** PUSH 'redirectProps' TO REDIRECT STORE FOR AUTO NAVIGATION ON USER AUTH
	useEffect(() => {
		if (!redirectProps) return;
		Object.keys(redirectProps).includes('redirectUrl') &&
			dispatch({
				type: GLOBALTYPES.REDIRECT,
				payload: { url: redirectProps?.redirectUrl.trim() },
			});
		Object.keys(redirectProps).includes('redirectUrl') &&
			dispatch({
				type: GLOBALTYPES.TOAST,
				payload: {
					info: 'Please login to continue!',
					title: 'Hey there!',
				},
			});
	}, [redirectProps]);

	const [userData, setUserData] = React.useState({ contact: '', password: '' });
	const { contact, password } = userData;
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
			contact: !contact && 'Please enter your email or phone number.',
			password: !password && 'Please enter your password.',
		});
		if (!contact || !password) return;
		if (isLoading(LOADING.LOGIN, loadingStore)) return;
		dispatch({ type: GLOBALTYPES.LOADING, payload: { [LOADING.LOGIN]: true } });
		dispatch({ type: GLOBALTYPES.TOAST, payload: { loading: 'Signing you in...' } });
		handleLoginWithCredentials({ contact, password });
	};

	return (
		<AuthLayout metatags={{ meta_title: `Login | ${SITE_DATA.OFFICIAL_NAME}` }} pageTitle={'Sign In to Your Account!'} logoUrl={logoUrl}>
			<TextField
				onChange={handleChangeInput}
				defaultValue={contact}
				color='primary'
				className='w-full mt-5'
				name='contact'
				label='Email Address or Phone Number'
				variant='standard'
				helperText={errors.contact}
				error={errors.contact ? true : false}
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
				className='w-full mt-5'
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
