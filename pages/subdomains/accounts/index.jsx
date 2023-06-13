/** @format */

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { APP_ROUTES } from '@/config';
import AccountsController from '@/pages/api/accounts/controller';
import Image from 'next/image';

const UserDashboard = () => {
	const { data: session } = useSession();

	console.log({ session });

	if (session) {
		return (
			<>
				{session?.user?.email}
				<br />
				{session?.user?.name}
				<br />
				<Image width={50} height={50} src={session?.user?.image} alt='photo' />
				<br />
				<h1>Protected Page</h1>
				<p>You can view this page because you are signed in.</p>
			</>
		);
	}
	return (
		<p>
			Access Denied
			{APP_ROUTES.LOGIN}
		</p>
	);
};

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) return { redirect: { destination: `${APP_ROUTES.LOGIN}?redirectUrl=${req.originalUrl}`, permanent: false } };

	//GET USER DATA FROM DB
	req.user = session?.user;
	const userData = await AccountsController.getUserData(req, res, true);
	if (userData?.redirect) return userData;

	return {
		props: {
			session: { ...session, user: { ...session?.user, ...userData?.user } },
		},
	};
}
export default UserDashboard;
