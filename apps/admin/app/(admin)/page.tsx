'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
	MoreHorizontal,
	PlusCircle,
    Search,
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
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/tailwind/ui/dropdown-menu"
import { Input } from "@/components/tailwind/ui/input";
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
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link"; 

type Post = {
  id: string;
  title: string;
  status: 'draft' | 'published';
  updatedAt: string;
};

// A reusable component for the table to avoid repetition
const PostsTable = ({ posts, allPostsCount, handleDelete, router, handleStatusToggle }: { posts: Post[], allPostsCount: number, handleDelete: (id: string) => void, router: any, handleStatusToggle: (id: string, status: 'draft' | 'published') => void }) => (
    <Card>
        <CardHeader>
            <CardTitle>Stories</CardTitle>
            <CardDescription>Manage your stories here.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post: Post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium" onClick={() => router.push(`view/${post.id}`)}>
								{post.title}
							</TableCell>

                            <TableCell>
                                <Badge variant={post.status === 'draft' ? 'secondary' : 'default'}>{post.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleStatusToggle(post.id, post.status)}>
                                    {post.status === 'draft' ? 'Publish' : 'Unpublish'}
                                </Button>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => router.push(`/editor/${post.id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(post.id)}>Delete</DropdownMenuItem>
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
                Showing <strong>{posts.length}</strong> of <strong>{allPostsCount}</strong> stories.
            </div>
        </CardFooter>
    </Card>
);


export default function Dashboard() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

	const handleCreateNew = () => {
		const newPostId = uuidv4();
		router.push(`/editor/${newPostId}`);
	};

	const handleDelete = async (postId: string) => {
		if (!confirm('Are you sure you want to delete this post?')) return;
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
			const res = await fetch(`${apiUrl}/api/posts/${postId}`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Failed to delete post');
			setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
		} catch (err: any) {
			console.error(err.message);
		}
	};

    const handleStatusToggle = async (postId: string, currentStatus: 'draft' | 'published') => {
		const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';
			const res = await fetch(`${apiUrl}/api/posts/${postId}/status`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus }),
			});
			if (!res.ok) throw new Error('Failed to toggle status');
			setPosts(currentPosts =>
				currentPosts.map(p => (p.id === postId ? { ...p, status: newStatus } : p))
			);
			console.log('[Dashboard] Toggling status for post:', { postId, newStatus });
		} catch (err: any) {
			console.error(err.message);
		}
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
    
    const filteredPosts = useMemo(() => {
        return posts.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [posts, searchQuery]);
    
    const publishedPosts = useMemo(() => filteredPosts.filter(p => p.status === 'published'), [filteredPosts]);
    const draftPosts = useMemo(() => filteredPosts.filter(p => p.status === 'draft'), [filteredPosts]);

    if (isLoading) return <div className="flex justify-center items-center h-full">Loading posts...</div>;
    if (error) return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  
    if (posts.length === 0 && !isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <img src="/sleepyCat.jpeg" alt="A sleepy cat" className="mb-4 w-48 h-48 object-cover rounded-full" />
                    <h3 className="text-2xl font-bold tracking-tight">You have no stories yet</h3>
                    <p className="text-sm text-muted-foreground">Get started by creating your first story.</p>
                    <Button className="mt-4" onClick={handleCreateNew}><PlusCircle className="h-4 w-4 mr-2" />Create New Story</Button>
                </div>
            </div>
        )
    }

	return (
		<Tabs defaultValue="all" onValueChange={setActiveTab}>
			<div className="flex items-center gap-4">
                {/* <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search stories by title..."
                        className="w-full rounded-lg bg-background pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}
				<TabsList>
					<TabsTrigger value="all">Stories</TabsTrigger>
					<TabsTrigger value="published">Published</TabsTrigger>
					<TabsTrigger value="drafts">Drafts</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<Button size="sm" className="h-8 gap-1" onClick={handleCreateNew}>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create New Story</span>
					</Button>
				</div>
			</div>
			<TabsContent value="all">
                <PostsTable posts={filteredPosts} allPostsCount={posts.length} handleDelete={handleDelete} router={router} handleStatusToggle={handleStatusToggle} />
			</TabsContent>
            <TabsContent value="published">
                <PostsTable posts={publishedPosts} allPostsCount={posts.length} handleDelete={handleDelete} router={router} handleStatusToggle={handleStatusToggle} />
			</TabsContent>
            <TabsContent value="drafts">
                <PostsTable posts={draftPosts} allPostsCount={posts.length} handleDelete={handleDelete} router={router} handleStatusToggle={handleStatusToggle} />
			</TabsContent>
		</Tabs>
	)
}