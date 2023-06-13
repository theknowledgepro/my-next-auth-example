/** @format */

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadElement from '@/pages/_meta_tags';
import { SITE_DATA } from '@/config';
import Divider from '@mui/material/Divider';
import { GLOBALTYPES } from '@/redux/types';
import { useDispatch } from 'react-redux';

const AuthLayout = ({ children, metatags, pageTitle, logoUrl }) => {
	// Get error message added by next/auth in URL.
	const { query } = useRouter();
	const dispatch = useDispatch();
	const { error } = query;

	useEffect(() => {
		const errorString = Array.isArray(error) ? error.pop() : error;
		let errorMessage;
		switch (errorString) {
			case 'Verification':
				errorMessage = 'The email verification link you followed is alredy used!';
			case 'CredentialsSignin':
				errorMessage = 'Your credentials are invalid! <br />Please try again!';
				break;
			default:
				errorMessage = errorString;
				break;
		}
		errorMessage &&
			dispatch({
				type: GLOBALTYPES.TOAST,
				payload: {
					error: errorMessage,
					title: 'Error!',
				},
			});

		document.querySelector(':root').style.setProperty('--app-bg', '#f5f5f5');
		return () => document.querySelector(':root').style.setProperty('--app-bg', '#fff');
	}, [error]);

	return (
		<React.Fragment>
			<HeadElement metatags={metatags} />
			<section className='row min-w-full min-h-screen w-full h-full flex flex-col items-center justify-center'>
				<div className='px-2 pt-5 pb-10 col-12 flex flex-col items-center justify-center'>
					<div className={`card card-primary max-h-full w-full px-3 py-1 my-5 max-w-xs`}>
						<div className='flex flex-col items-center justify-center mt-3'>
							<img src={logoUrl} height={130} width={140} alt='logo' />
							<div className='md:text-xl sm:text-base font-semibold text-center mt-2'>{pageTitle}</div>
						</div>
						<Divider className='my-3' />
						<div className='w-full'>{children}</div>
					</div>
				</div>
				<div className='text-center text-gray-500 mb-5 text-sm'>&copy; 2023 {SITE_DATA.OFFICIAL_NAME}</div>
			</section>
		</React.Fragment>
	);
};

export default AuthLayout;
