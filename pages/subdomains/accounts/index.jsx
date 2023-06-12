/** @format */

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';

const UserDashboard = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				<h1>Protected Page</h1>
				<p>You can view this page because you are signed in.</p>
			</>
		);
	}
	return <p>Access Denied</p>;
};

export async function getServerSideProps({ req, res }) {
	const session = await getServerSession(req, res, authOptions);
	console.log({ session });
	return {
		props: {
			session: session,
		},
	};
}
export default UserDashboard;
