/** @format */
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const dev_domain = process.env.NEXT_PUBLIC_DEV_DOMAIN;
const production = process.env.NEXT_PUBLIC_PUB === 'production';

const adminSubDomain = production ? `https://admin.${domain}` : `${dev_domain}/subdomains/admin`;
const accountsSubDomain = production ? `https://accounts.${domain}` : `${dev_domain}/subdomains/accounts`;

module.exports = {
	NOT_FOUND: '404',
	HOME: '/',
	CONTACT_US: '/contact-us',
	ABOUT_US: '/about-us',
	SERVICES: '/services',
	TERMS: '#',

	// ** ADMIN PANEL ROUTES
	ADMIN_DASHBOARD: `${adminSubDomain}`,
	ADMIN_PROFILE: `${adminSubDomain}/my-profile`,
	PAGES_CUSTOMIZATION: `${adminSubDomain}/pages`,
	CONTACT_FORM_SUBMISSIONS: `${adminSubDomain}/contact-form-submissions`,
	MANAGE_ADMINS: `${adminSubDomain}/manage-admins`,
	SITE_SETTINGS: `${adminSubDomain}/site-settings`,
	ACTIVITY_LOGS: `${adminSubDomain}/activity-logs`,

	// ** USER AUTHENTICATED ROUTES
	USER_DASHBOARD: `${accountsSubDomain}`,

	// ** AUTHENTICATION ROUTES
	LOGIN: `${accountsSubDomain}/login`,
	FIRST_TIME_LOGIN: `${accountsSubDomain}/new`,
	VERIFY_EMAIL_FOR_SIGNUP:`${accountsSubDomain}/verify-email`,
	REGISTER: `${accountsSubDomain}/register`,
	FORGOT_PASSWORD: `${accountsSubDomain}/forgot-password`,
};
