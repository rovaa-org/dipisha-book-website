'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from 'uuid'


// Define the type for our post data
type Post = {
  id: string;
  title: string;
  status: 'draft' | 'published';
  updatedAt: string; // Will be a timestamp string
};

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
	const handleCreateNew = () => {
		const newPostId = uuidv4();
		router.push(`/editor/${newPostId}`);
	};

  useEffect(() => {
    async function fetchPosts() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
      
		try {
        const res = await fetch(`${apiUrl}/api/posts`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading posts...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>
  }
  
  if (posts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <img src="/sleepyCat.jpeg" alt="A sleepy cat" className="mb-4 w-48 h-48 object-cover rounded-full" />
          <h3 className="text-2xl font-bold tracking-tight">
            You have no blog posts yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first post.
          </p>
          <Button className="mt-4" onClick={handleCreateNew}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Blog
          </Button>
        </div>
      </div>
    )
  }

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="published">Published</TabsTrigger>
					<TabsTrigger value="drafts">Drafts</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					{/* Filter and Export buttons can be wired up later */}
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
					<Button size="sm" className="h-8 gap-1" onClick={handleCreateNew}>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Create New Blog
						</span>
					</Button>
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
								{posts.map(post => (
									<TableRow key={post.id}>
										<TableCell className="font-medium">{post.title}</TableCell>
										<TableCell>
											<Badge variant={post.status === 'draft' ? 'secondary' : 'default'}>{post.status}</Badge>
										</TableCell>
										<TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
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
													<DropdownMenuItem onClick={() => router.push(`/editor/${post.id}`)}>Edit</DropdownMenuItem>
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
							Showing <strong>{posts.length}</strong> of <strong>{posts.length}</strong> posts
						</div>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}