"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicFacultyMutation } from "@/redux/api/academic/facultyApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateFacultyPage = () => {
  const router = useRouter();

  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      const res = await addAcademicFaculty(data);

      if (!!res) {
        message.success("Academic faculty added successfully");
        router.push("/admin/academic/faculty");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div style={{ marginLeft: "10px" }}>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          {
            label: "manage_faculty / create_faculty",
            link: `/${base}/academic/faculty`,
          },
        ]}
      />
      <h1>Create Faculty</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateFacultyPage;
