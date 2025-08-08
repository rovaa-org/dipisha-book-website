import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your blog posts here.</p>
            <Link href="/blogs/new">
              <Button>New Post</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Books</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your books here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
