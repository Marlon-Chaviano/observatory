import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";

import { Footer, Navbar } from "@/components/layouts";

import "./globals.css";

// Configuración de fuentes
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const publicSans = Public_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-public-sans",
});

// Metadatos del sitio
export const metadata: Metadata = {
	title: "Hub Central OCEM - Observatorio Cubano de Energía y Minas",
	description: "Plataforma estratégica cubana",
	icons: {
		other: [
			{
				rel: "stylesheet",
				url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body
				className={` ${publicSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
