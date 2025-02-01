import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SkyCast",
	description: "Weather forecast for your city",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="min-h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-blue-100 to-white`}
			>
				{children}
			</body>
		</html>
	);
}