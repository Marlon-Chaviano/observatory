import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.API_URL || "http://localhost:8000"}/api/:path*/`,
			},
		];
	},
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

export default nextConfig;
module.exports = nextConfig;
