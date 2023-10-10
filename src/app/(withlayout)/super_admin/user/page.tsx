import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ManageUser = () => {
  const { role } = getUserInfo() as any;

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <h1>This is manage User</h1>
      <Link href={"/super_admin/user/create"}>
        <Button type="primary" size={"large"}>
          Create User
        </Button>
      </Link>
    </div>
  );
};

export default ManageUser;
