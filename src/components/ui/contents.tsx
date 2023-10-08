"use client";
import { Layout } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";
import Header from "./Header";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";

  return (
    <>
      {/* header  */}
      <Header></Header>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: `student`, link: `/${base}/student` },
        ]}
      />
      <Content
        style={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Content>
    </>
  );
};

export default Contents;
