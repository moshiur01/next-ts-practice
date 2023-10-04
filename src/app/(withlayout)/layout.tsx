import Contents from "@/components/ui/contents";
import Sidebar from "@/components/ui/sidebar";
import { Layout } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout hasSider>
      <Sidebar></Sidebar>
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
