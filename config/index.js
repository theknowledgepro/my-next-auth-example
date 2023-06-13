/** @format */
const API_ROUTES = require('./api_routes');
const APP_ROUTES = require('./app_routes');
const LOADING = require('./loading_types');
const ACTIVITY_TYPES = require('./activity_types');
const ADMIN_PANEL_ACTIONS = require('./admin_panel_actions');
const MEMBER_ROLES = require('./member_roles');

const SITE_DATA = {
	URL: 'http://localhost:3000',
	NAME: 'greenexperientials',
	OFFICIAL_NAME: 'GreenExperientials',
	MONGODB_DB_NAME: 'greenexperientials',
	BUSINESS_EMAIL_HANDLE: '@greenexperientials.com',
	THEME_COLOR: '#006d34',
	DEFAULT_MALE_AVATAR: 'https://res.cloudinary.com/dhdckmdzz/image/upload/v1683274544/avatars/male-avatar_x1ieml.jpg',
	DEFAULT_FEMALE_AVATAR: '',
	DEVELOPER_URL: '',
};

module.exports = {
	API_ROUTES,
	APP_ROUTES,
	LOADING,
	ACTIVITY_TYPES,
	ADMIN_PANEL_ACTIONS,
	MEMBER_ROLES,
	SITE_DATA
}