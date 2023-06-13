/** @format */

import React from 'react';
import Head from 'next/head';
import { SITE_DATA } from '@/config';

const MetaTags = ({ metatags }) => {
	return (
		<Head>
			{metatags?.meta_title && <title>{metatags.meta_title}</title>}
			{metatags?.meta_description && <meta name='description' content={metatags.meta_description} />}
			{metatags?.meta_keywords && <meta name='keywords' content={metatags.meta_keywords} />}
			{metatags?.meta_title && <meta itemProp='name' content={metatags.meta_title} />}
			{metatags?.meta_description && <meta itemProp='description' content={metatags.meta_description} />}
			<meta itemProp='image' content='/favicon.png' />

			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />
			<meta name='theme-color' content={SITE_DATA.THEME_COLOR} />
			<meta charSet='utf-8' />
			<link rel='icon' href='/favicon.png' />
			<link rel='shortcut icon' type='image/x-icon' href='/favicon.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' />

			{metatags?.og_title && <meta property='og:title' content={metatags.og_title} />}
			{metatags?.og_description && <meta property='og:description' content={metatags.og_description} />}
			{metatags?.og_site_name && <meta property='og:site_name' content={SITE_DATA.NAME} />}
			{metatags?.og_url && <meta property='og:url' content={metatags.og_url} />}
			{metatags?.og_image && <meta property='og:image' content={metatags.og_image} />}
			<meta property='og:type' content='website' />

			{metatags?.twitter_title && <meta name='twitter:title' content={twitter_title} />}
			{metatags?.twitter_description && <meta name='twitter:description' content={metatags.twitter_description} />}
			{metatags?.twitter_card && <meta name='twitter:card' content={metatags.twitter_card} />}
			{metatags?.twitter_image && <meta name='twitter:image' content={metatags.twitter_image} />}
			<meta name='twitter:site' content='@Elegance' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:creator' content='@StevenTey' />
		</Head>
	);
};

export default MetaTags;
