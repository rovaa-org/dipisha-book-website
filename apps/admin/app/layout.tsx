import "@dipisha/styles/tailwind-base.css";
import "@dipisha/styles/prosemirror.css";
import 'katex/dist/katex.min.css';

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";

const title = "Dipisha's Admin Dashboard";
const description = "Admin dashboard for managing blog content.";

export const metadata: Metadata = {
	title,
	description,
	robots: {
		index: false,
		follow: false,
	}
};

export const viewport: Viewport = {
	themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
