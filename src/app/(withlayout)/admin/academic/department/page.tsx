"use client";
import { Button, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, RedoOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/department";

const ManageAcademicDepartment = () => {
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

  // get all faculty data
  const { data, isLoading } = useAcademicDepartmentsQuery({ ...query });
  const academicDepartments = data?.academicDepartments;
  const meta = data?.meta;

  //handle delete department
  const handleDeleteDepartment = async (data: any) => {
    try {
      //   await deleteDepartment(data?.id);
      message.success("Academic Department Data Deleted successfully");
    } catch (err: any) {
      // console.error(err.message);
      message.error(err.message);
    }
  };

  //columns heading
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Faculty",
      dataIndex: "academicFaculty",
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
            label: `${role}/manage_academicDepartment`,
            link: `/${role}`,
          },
        ]}
      />

      {/* search and reset  bar  */}
      <ActionBar title="academic Department List">
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
          <Link href={`/${role}/academic/department/create`}>
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
        dataSource={academicDepartments}
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

export default ManageAcademicDepartment;
