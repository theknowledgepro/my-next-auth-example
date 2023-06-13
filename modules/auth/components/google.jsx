/** @format */

import { SITE_DATA } from '@/config';
import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import GoogleImage from '@/assets/google.png';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

const GoogleButton = ({ handleLoginWithGoogle }) => {
	const [isLoading, setIsLoading] = useState(false);
	const handleClick = () => {
		setIsLoading(true);
		handleLoginWithGoogle();
	};
	return (
		<div className='w-full flex flex-col items-center justify-center mt-5'>
			<Divider className='my-3 w-full' />
			<div className='text-gray-400 fs-12 text-center'>or sign in with</div>
			<Button
				onClick={handleClick}
				color='primary'
				sx={{
					width: '40px',
					height: '40px',
					padding: 0,
					margin: '5px 0 0',
					minWidth: '10px',
					borderRadius: '50%',
				}}
				className={`shadow-md text-none flex items-center justify-center`}>
				{isLoading && (
					<CircularProgress
						style={{
							color: SITE_DATA.THEME_COLOR,
							height: '20px',
							width: '20px',
						}}
					/>
				)}
				{!isLoading && <Image src={GoogleImage} width={25} height={25} alt='Google' />}
			</Button>
		</div>
	);
};

export default GoogleButton;
