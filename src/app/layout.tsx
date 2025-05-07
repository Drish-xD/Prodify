import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Flex({
	subsets: ["latin"],
	variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Prodify",
		default: "Prodify",
	},
	description: "Chat with an AI about specific products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={roboto.variable}>
			<body className="bg-background min-h-screen">
				{children}
				<Toaster richColors />
			</body>
		</html>
	);
}
