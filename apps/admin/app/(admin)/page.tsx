import Link from "next/link"
import {
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/tailwind/ui/badge"
import { Button } from "@/components/tailwind/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/tailwind/ui/card"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/tailwind/ui/dropdown-menu"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/tailwind/ui/table"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/tailwind/ui/tabs"

// Mock data for posts
const mockPosts = [
	{ id: "1", title: "The Future of AI in Content Creation", status: "Published", lastUpdated: "10 days ago" },
	{ id: "2", title: "Deep Dive: Frontend Frameworks", status: "Published", lastUpdated: "10 hours ago" },
	{ id: "3", title: "Unsent Email Draft", status: "Draft", lastUpdated: "just now" },
	{ id: "4", title: "Exploring the Alps: A Travelogue", status: "Draft", lastUpdated: "2 days ago" },
];


export default function Dashboard() {
	const publishedPosts = mockPosts.filter(p => p.status === 'Published');
	const draftPosts = mockPosts.filter(p => p.status === 'Draft');

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="published">Published</TabsTrigger>
					<TabsTrigger value="drafts">Drafts</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-8 gap-1">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Filter
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by status</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Published
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
					<Link href="/editor">
						<Button size="sm" className="h-8 gap-1">
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Create New Blog
							</span>
						</Button>
					</Link>
				</div>
			</div>
			<TabsContent value="all">
				<Card>
					<CardHeader>
						<CardTitle>All Blog Posts</CardTitle>
						<CardDescription>
							Manage your blog posts here.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Title</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>
										Last Updated
									</TableHead>
									<TableHead>
										<span className="sr-only">Actions</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockPosts.map(post => (
									<TableRow key={post.id}>
										<TableCell className="font-medium">{post.title}</TableCell>
										<TableCell>
											<Badge variant={post.status === 'Draft' ? 'secondary' : 'default'}>{post.status}</Badge>
										</TableCell>
										<TableCell>{post.lastUpdated}</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
					<CardFooter>
						<div className="text-xs text-muted-foreground">
							Showing <strong>1-10</strong> of <strong>{mockPosts.length}</strong> posts
						</div>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
