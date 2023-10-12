"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";
import { Island_Moments } from "next/font/google";
import { useRouter } from "next/navigation";

type IdProps = {
  params: any;
};
const EditDePartmentName = ({ params }: IdProps) => {
  const { id } = params;

  const router = useRouter();

  //fetch single department data
  const { data, isLoading } = useDepartmentQuery(id);

  // call the data update function
  const [updateDepartment] = useUpdateDepartmentMutation();

  //handle update
  const handleUpdateDepartment = async (values: { title: string }) => {
    message.loading("updating.....");
    try {
      await updateDepartment({ id, body: values });
      message.success("Department Updated successfully");
      router.push("/super_admin/department");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  type DefaultValues = {
    title: string | "";
  };
  const defaultValues: DefaultValues = {
    title: data?.title || "",
  };
  return (
    <div style={{ marginTop: "10px", marginLeft: "40px" }}>
      <UMBreadCrumb
        items={[
          {
            label: `super_admin/department/edit_department`,
            link: `/super_admin/department`,
          },
        ]}
      />

      <h1>Update Department</h1>

      <Form
        submitHandler={handleUpdateDepartment}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ width: "60%" }}>
              <FormInput name="title" label="Title" type="text" />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDePartmentName;
