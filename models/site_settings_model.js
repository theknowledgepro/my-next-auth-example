/** @format */

const { SITE_DATA } = require('@/config');
const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema(
	{
		type: { type: String },
		config: { type: Object },
	},
	{ timestamps: true }
);

const DB = mongoose.connection.useDb(SITE_DATA.MONGODB_DB_NAME);

module.exports = DB.models.SiteSettings || DB.model('SiteSettings', SiteSettingsSchema);
