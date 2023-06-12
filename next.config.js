/**
 * @format
 * @type {import('next').NextConfig}
 */
const domain = process.env.DOMAIN;
const dev_domain = process.env.DEV_DOMAIN;

const accounts = process.env.SUBDOMAIN_ACCOUNTS;
const admin = process.env.SUBDOMAIN_ADMIN;

const production = process.env.PROD_ENV === 'production';

const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return {
			afterFiles: [
				{
					source: '/:path*',
					has: [
						{
							type: 'host',
							value: production ? `${accounts}.${domain}` : `${accounts}.${dev_domain}`,
						},
					],
					destination: '/subdomains/accounts/:path*',
				},
				{
					source: '/:path*',
					has: [
						{
							type: 'host',
							value: production ? `${admin}.${domain}` : `${admin}.${dev_domain}`,
						},
					],
					destination: '/subdomains/admin/:path*',
				},
			],
		};
	},
	async redirects() {
		return [
			{
				source: '/subdomains/accounts/:path*',
				has: [
					{
						type: 'host',
						value: production ? `${domain}` || `www.${domain}` : `${dev_domain}`,
					},
				],
				destination: production ? `${accounts}.${domain}/:path*` : `${accounts}.${dev_domain}/:path*`,
				permanent: true,
			},

			{
				source: '/subdomains/admin/:path*',
				has: [
					{
						type: 'host',
						value: production ? `${domain}` || `www.${domain}` : `${dev_domain}`,
					},
				],
				destination: production ? `${admin}.${domain}/:path*` : `${admin}.${dev_domain}/:path*`,
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
