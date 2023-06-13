/** @format */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/auth/[...nextauth]';
import { getToken } from "next-auth/jwt"

const Authenticate = async () => {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		res.send({
			content: 'This is protected content. You can access this content because you are signed in.',
		});
	} else {
		res.send({
			error: 'You must be signed in to view the protected content on this page.',
		});
	}
};

const getToken = async () => {
	const token = await getToken({ req });
	if (token) {
		// Signed in
		console.log('JSON Web Token', JSON.stringify(token, null, 2));
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};

module.exports = {
	Authenticate,
};
