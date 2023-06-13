/** @format */

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import HeadElement from '@/pages/_meta_tags';
import { SITE_DATA } from '@/config';
import Divider from '@mui/material/Divider';
import toast, { Toaster } from 'react-hot-toast';

const AuthLayout = ({ children, metatags, pageTitle, logoUrl }) => {
	// Get error message added by next/auth in URL.
	const { query } = useRouter();
	const { error } = query;

	useEffect(() => {
		const errorString = Array.isArray(error) ? error.pop() : error;
		let errorMessage;
		switch (errorString) {
			case 'Verification':
				errorMessage = 'The email verification link you followed is alredy used!';
				break;
			default:
				errorMessage = errorString;
				break;
		}
		errorMessage && toast.error(errorMessage);

		document.querySelector(':root').style.setProperty('--app-bg', '#f5f5f5');
		return () => document.querySelector(':root').style.setProperty('--app-bg', '#fff');
	}, [error]);

	return (
		<React.Fragment>
			<HeadElement metatags={metatags} />
			<section className='row min-w-full min-h-screen w-full h-full flex flex-col items-center justify-center'>
				<div className='px-2 pt-5 pb-2 col-12 flex flex-col items-center justify-center'>
					<div className={`card card-primary max-h-full w-full`} style={{ maxWidth: '310px', padding: '5px 10px', margin:'20px 0' }}>
						<div className='flex flex-col items-center justify-center mt-3'>
							<img src={logoUrl} height={130} width={140} alt='logo' />
							<h2 className='md:text-xl sm:text-base text-center mt-3' style={{ fontWeight: '600' }}>
								{pageTitle}
							</h2>
						</div>
						<Divider style={{ margin: '10px' }} />
						<div className='w-full' style={{ padding: '5px' }}>
							{children}
						</div>
					</div>
				</div>
				<Toaster />
				<div className='text-center text-gray-500 text-sm'>&copy; 2023 {SITE_DATA.OFFICIAL_NAME}</div>
			</section>
		</React.Fragment>
	);
};

export default AuthLayout;
