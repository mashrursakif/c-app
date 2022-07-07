/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	// cloudinary env
	env: {
		CLOUDINARY_URL:
			'cloudinary://526213932585668:V0fVV2xG28yTBMl2833oNCfvCXA@dik522vqy',
		CLOUD_NAME: 'dik522vqy',
		API_KEY: '526213932585668',
		API_SECRET: 'V0fVV2xG28yTBMl2833oNCfvCXA',
	},
};

module.exports = nextConfig;
