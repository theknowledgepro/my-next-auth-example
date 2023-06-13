/** @format */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { APP_ROUTES } from '@/config';
import connectDB from '@/middlewares/db_config';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from '@/middlewares/next-auth-mongodb-adapter';
const Users = require('@/models/user_model');
const production = process.env.PROD_ENV === 'production';

export default NextAuth({
	secret: process.env.AUTH_SECRET,
	// adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					first_name: profile.given_name,
					last_name: profile.family_name,
					email: profile.email,
					email_verified: profile.email_verified,
					image: profile.picture,
				};
			},
		}),
		CredentialsProvider({
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const authResponse = await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials),
				});

				if (!authResponse.ok) return null;

				const user = await authResponse.json();

				return user;
			},
		}),
	],
	pages: {
		signIn: APP_ROUTES.LOGIN,
		error: APP_ROUTES.LOGIN, // Error code passed in query string as ?error=
		signOut: '/signout',
		// verifyRequest: APP_ROUTES.VERIFY_EMAIL_FOR_SIGNUP, // (used for check email message)
		newUser: APP_ROUTES.FIRST_TIME_LOGIN, // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	cookies: {
		sessionToken: {
			name: `${production ? '__Secure-' : ''}next-auth.session-token`,
			options: {
				httpOnly: true,
				// sameSite: 'lax',
				path: '/',
				// When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
				domain: production ? '.vercel.pub' : undefined,
				secure: production,
			},
		},
	},
	callbacks: {
		jwt: ({ token, account, profile }) => {
			if (account) {
				token.provider = account.provider;
				token.access_token = account.access_token;
				token.id_token = account.id_token;
				token.expires_at = account.expires_at;
			}
			return token;
		},
		session: ({ session, token, user }) => {
			// console.log({ session, token, user });
			return {
				...session,
				user: {
					...session.user,
					_id: token?._id,
					url: token?.url,
					username: token?.username,
				},
			};
		},
		signIn: async ({ user, account, profile, email, credentials }) => {
			console.log({ user, account, profile, email, credentials });
			if (account.provider === 'google') {
				const { email, email_verified, picture, family_name, given_name, locale } = profile;

				if (!email_verified) return `${APP_ROUTES.LOGIN}?error=Your email address is not verified!`;
				await connectDB();
				const userExist = await Users.findOne({ email });
				if (userExist) return true;

				const userData = {
					username: email.split('@')[0],
					email,
					avatar: picture,
					lastname: family_name,
					firstname: given_name,
					sign_up_method: 'google',
				};
				const newUser = new Users(userData);
				await newUser.save();

				return true;
			}
			return true;
		},
	},
});
