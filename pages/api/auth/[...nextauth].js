/** @format */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			profile(profile) {
				console.log({ profile });
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					gh_username: profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
	],
	pages: {
		signIn: `/`,
		verifyRequest: `/`,
		error: '/', // Error code passed in query string as ?error=
	},
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
				username: user.username,
			},
		}),
	},
});
