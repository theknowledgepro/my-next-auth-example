/** @format */

const { APP_ROUTES } = require('@/config');
const connectDB = require('@/middlewares/db_config');
const Users = require('@/models/user_model');

const AccountsController = {
	getUserData: async (req, res, SSG = false) => {
		const redirectObject = {
			redirect: { destination: `${APP_ROUTES.LOGIN}?redirectUrl=${req?.originalUrl}`, permanent: false },
		};
		try {
			await connectDB();
			const user = await Users.findOne({ email: req?.user?.email });
			if (!user) return redirectObject;

			return JSON.parse(JSON.stringify({ user }));
		} catch (err) {
			console.log(err);
			return redirectObject;
		}
	},
};

module.exports = AccountsController;
