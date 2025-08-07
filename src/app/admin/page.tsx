"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CMS = dynamic(
  async () => {
    const cmsModule = await import("decap-cms-app");
    cmsModule.default.init(); // Initialize CMS to load config from public/admin/config.yml
    const CMSComponent = () => <div id="nc-root"></div>;
    CMSComponent.displayName = "CMSComponent";
    return CMSComponent;
  },
  { ssr: false, loading: () => <p>Loading CMS...</p> }
);

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <CMS /> : null;
}