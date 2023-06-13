// EmailProvider({
		// 	server: {
		// 		host: process.env.SMTP_HOST,
		// 		port: Number(process.env.SMTP_PORT),
		// 		auth: {
		// 			user: process.env.SMTP_USER,
		// 			pass: process.env.SMTP_PASSWORD,
		// 		},
		// 	},
		// 	from: `support@${process.env.NEXT_PUBLIC_DOMAIN}`,
		// 	maxAge: 60 * 60 * 0.5, // 30 mins
		// 	sendVerificationRequest(params) {
		// 		emailSignUpVerificationRequest(params);
		// 	},
		// }),