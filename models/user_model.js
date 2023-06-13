/** @format */

const { MEMBER_ROLES, SITE_DATA } = require('@/config');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			default: uuidv4(),
		},
		firstname: {
			type: String,
			trim: true,
			default: '',
		},
		secondname: {
			type: String,
			trim: true,
			default: '',
		},
		lastname: {
			type: String,
			trim: true,
			default: '',
		},
		username: {
			type: String,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		mobile: {
			type: String,
			default: '',
		},
		password: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			default: process.env.DEFAULT_AVATAR,
		},
		restrictions: {
			// ** FOR ADMINS ONLY
			// ** AN ARRAY OF ADMIN PANEL ACTIONS THIS ADMIN IS RESTRICTED TO.
			// ** USED TO DETERMINE IF ELEMENTS WILL BE RENDERED IN FRONTEND
			type: Array,
			required: false,
		},
		gender: {
			type: String,
			default: 'Male',
		},
		sign_up_method: {
			type: String,
			required: true,
			default: 'credentials',
		},
		otp_secret: {
			type: String,
			required: false,
		},
		member_role: {
			type: String,
			default: MEMBER_ROLES.USER,
		},
		last_login: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const DB = mongoose.connection.useDb(SITE_DATA.MONGODB_DB_NAME);

module.exports = DB.models.User || DB.model('User', UserSchema);
