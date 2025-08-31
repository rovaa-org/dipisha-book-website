import Link from "next/link";
import {
	FileText,
	Home,
} from "lucide-react";
import { Badge } from "@/components/tailwind/ui/badge";
import { Button } from "@/components/tailwind/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/tailwind/ui/card";
import { Header } from "./_components/header";
export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<FileText className="h-6 w-6" />
							<span className="">Dipisha's Dashboard</span>
						</Link>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/"
								className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all hover:text-primary-foreground/80"
							>
								<Home className="h-4 w-4" />
								All Posts
							</Link>
						</nav>
					</div>
					<div className="mt-auto p-4">
						<Card>
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Found an Issue?</CardTitle>
								<CardDescription>
									Help us improve by reporting bugs or suggesting features.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Link href="https://github.com/rovaa-org/dipisha-book-website/issues" target="_blank">
									<Button size="sm" className="w-full">
										Give Feedback
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>				</div>
			</div>
			<div className="flex flex-col">
				<Header />
				{/* We will add a header with search and user menu later */}
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
