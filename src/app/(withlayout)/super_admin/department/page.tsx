"use client";
import { Button, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "@/redux/api/departmentApi";
import { DeleteOutlined, EditOutlined, RedoOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
import Modal from "@/components/ui/Model";
import ModalUI from "@/components/ui/Model";

const ManageDepartment = () => {
  const { role } = getUserInfo() as any;

  //query to fetched data
  const query: Record<string, any> = {};

  //declare state for query
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  //set the state values to the query
  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  //set debounce data
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // get all department data
  const { data, isLoading } = useGetDepartmentsQuery({ ...query });
  const departments = data?.departments;
  const meta = data?.meta;

  //call the delete function
  const [deleteDepartment] = useDeleteDepartmentMutation();

  //handle delete department
  const handleDeleteDepartment = async (data: any) => {
    try {
      await deleteDepartment(data?.id);
      message.success("Department Deleted successfully");
    } catch (err: any) {
      // console.error(err.message);
      message.error(err.message);
    }
  };

  //columns heading
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      // sorter: (a: any, b: any) => a.age - b.age,
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link href={`department/edit/${data?.id}`}>
              <Button type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                handleDeleteDepartment(data);
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

  //reset functionality

  const resetFilters = () => {
    setSearchTerm("");
    setSortOrder("");
    setSortBy("");
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

      {/* search and reset  bar  */}
      <ActionBar title="Department List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "18%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <RedoOutlined />
            </Button>
          )}
          <Link href={`/${role}/department/create`}>
            <Button type="primary" size={"large"}>
              Create Department
            </Button>
          </Link>
        </div>
      </ActionBar>

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

export default ManageDepartment;
