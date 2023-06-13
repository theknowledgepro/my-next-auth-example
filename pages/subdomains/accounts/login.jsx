/** @format */

import { signIn } from 'next-auth/react';
import { Login } from '@/modules/auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { APP_ROUTES, MEMBER_ROLES } from '@/config';

export default function LoginPage() {
	const handleLoginWithCredentials = ({ email, password }) => signIn('credentials', { email, password });
	const handleLoginWithGoogle = () => signIn('google');

	return <Login handleLoginWithCredentials={handleLoginWithCredentials} handleLoginWithGoogle={handleLoginWithGoogle} logoUrl={''} />;
}

export async function getServerSideProps({ req, res }) {
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
		props: {},
	};
}
