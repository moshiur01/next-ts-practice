"use client";
import { Layout } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";

  return (
    <>
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
