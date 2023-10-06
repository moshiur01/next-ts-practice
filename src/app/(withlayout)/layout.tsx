"use client";
import Contents from "@/components/ui/contents";
import Sidebar from "@/components/ui/sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isUserLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return <p> Loading....</p>;
  }
  return (
    <Layout hasSider>
      <Sidebar></Sidebar>
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
