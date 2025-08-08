import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogs } from "@/lib/blogs";

export default function BlogsShowcase() {
  const blogs = getAllBlogs();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{blog.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
