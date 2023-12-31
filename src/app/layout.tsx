import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Providers from "@/services/Providers";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rent A Car",
	description:
		"Rent A Car is a car rental service. You can rent a car here.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + " overflow-y-scroll"}>
				<ClerkProvider>
					<Providers>
						<SignedIn>
							<Navbar />
							{children}
						</SignedIn>
						<SignedOut>
							<SignIn />
						</SignedOut>
					</Providers>
				</ClerkProvider>
			</body>
		</html>
	);
}
