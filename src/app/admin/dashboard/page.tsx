//  /src/app/admin/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/admin");
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-lg">Welcome to the content management dashboard.</p>
      <div className="mt-8">
        <Button onClick={() => router.push("/admin/editor")}>
          Create New Content
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Existing Content</h2>
        <p className="mt-2 text-gray-600">(Coming Soon) A list of existing books and blogs will be displayed here.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;