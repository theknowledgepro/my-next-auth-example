/**
 * @format
 * @type {import('next').NextConfig}
 */
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const dev_domain = process.env.NEXT_PUBLIC_DEV_DOMAIN;

const accounts = process.env.SUBDOMAIN_ACCOUNTS;
const admin = process.env.SUBDOMAIN_ADMIN;

const production = process.env.PROD_ENV === 'production';

const nextConfig = {
	images: {
		domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
	},
	reactStrictMode: true,
	async rewrites() {
		return {
			afterFiles: [
				{
					source: '/:path*',
					has: [
						{
							type: 'host',
							value: production ? `https://${accounts}.${domain}` : `${accounts}.${dev_domain}`,
						},
					],
					destination: '/subdomains/accounts/:path*',
				},
				{
					source: '/:path*',
					has: [
						{
							type: 'host',
							value: production ? `https://${admin}.${domain}` : `${admin}.${dev_domain}`,
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
						value: production ? `https://${domain}` || `https://www.${domain}` : `${dev_domain}`,
					},
				],
				destination: production ? `https://${accounts}.${domain}/:path*` : `${accounts}.${dev_domain}/:path*`,
				permanent: true,
			},

			{
				source: '/subdomains/admin/:path*',
				has: [
					{
						type: 'host',
						value: production ? `https://${domain}` || `https://www.${domain}` : `${dev_domain}`,
					},
				],
				destination: production ? `https://${admin}.${domain}/:path*` : `${admin}.${dev_domain}/:path*`,
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
