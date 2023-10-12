"use client";
import { Button } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { getUserInfo } from "@/services/auth.service";

const ManageUser = () => {
  const { role } = getUserInfo() as any;

  //query to fetched data
  const query: Record<string, any> = {};

  //declare state for query
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  //setting state values to the query
  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  // get all department data
  const { data, isLoading } = useGetDepartmentsQuery({ ...query });
  const departments = data?.departments;
  const meta = data?.meta;

  // console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      // sorter: (a: any, b: any) => a.age - b.age,
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                console.log(data);
              }}
              type="primary"
            >
              <FundViewOutlined />
            </Button>

            <Button
              onClick={() => {
                console.log(data);
              }}
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                console.log(data);
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  //pagination function
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    setPage(page); //which page
    setSize(pageSize); //total data size in one page
  };

  //sorter function
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    // console.log("sorter", sorter);
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div style={{ margin: "0px 10px" }}>
      {/* for creating department  */}
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <h1>This is manage Department</h1>
      <Link href={`/${role}/department/create`}>
        <Button type="primary" size={"large"}>
          Create Department
        </Button>
      </Link>

      {/* for showing department  */}
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={departments}
        pageSize={size}
        totalPage={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageUser;
