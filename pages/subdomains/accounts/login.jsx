/** @format */

import { signIn } from 'next-auth/react';
import { Login } from '@/modules/auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { APP_ROUTES, MEMBER_ROLES } from '@/config';

export default function LoginPage({ redirectProps }) {
	const handleLoginWithCredentials = ({ contact, password }) => signIn('credentials', { contact, password, isLogin: true });
	const handleLoginWithGoogle = () => signIn('google');

	return (
		<Login
			redirectProps={redirectProps}
			handleLoginWithCredentials={handleLoginWithCredentials}
			handleLoginWithGoogle={handleLoginWithGoogle}
			logoUrl={''}
		/>
	);
}

export async function getServerSideProps({ req, res, query }) {
	const session = await getServerSession(req, res, authOptions);
	if (session)
		return {
			redirect: {
				destination:
					session?.user?.member_role === MEMBER_ROLES.MASTER || session?.user?.member_role === MEMBER_ROLES.MANAGER
						? APP_ROUTES.ADMIN_DASHBOARD
						: APP_ROUTES.USER_DASHBOARD,
				permanent: false,
			},
		};

	return {
		props: { redirectProps: query },
	};
}
