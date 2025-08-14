//  /src/app/admin/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminLoginPage = () => {
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (secret === "I've stories yet to tell") {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter secret phrase"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <Button onClick={handleLogin} className="w-full">
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;