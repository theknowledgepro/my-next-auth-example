/** @format */

const { SITE_DATA } = require('@/config');
const mongoose = require('mongoose');

const vTokensSchema = mongoose.Schema(
	{
		identifier: { type: String, trim: true, required: true },

		token: { type: String, trim: true, required: true },
		expires: { type: Date, required: true },
	},
	{ timestamps: true }
);

const DB = mongoose.connection.useDb(SITE_DATA.MONGODB_DB_NAME);

module.exports = DB.models.verification_tokens || DB.model('verification_tokens', vTokensSchema);
