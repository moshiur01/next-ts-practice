"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FromSeletField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/department";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateAcademicDepartmentPage = () => {
  const router = useRouter();

  //call the create academic department hook
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  //get data from faculty
  const { data } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const academicFaculties = data?.academicFaculties;
  const acFacultiesOptions = academicFaculties?.map((faculty) => {
    return {
      label: faculty?.title,
      value: faculty?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    // console.log(data);
    try {
      const res = await addAcademicDepartment(data);
      if (!!res) {
        message.success("Academic Department added successfully");
        router.push("/admin/academic/department");
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
            label: "manage_academic_department / create_academic_department",
            link: `/${base}/academic/department`,
          },
        ]}
      />
      <h1>Create Academic Department</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              size="large"
              name="academicFacultyId"
              options={acFacultiesOptions as SelectOptions[]}
              label="Academic Faculty"
              placeholder="Select"
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateAcademicDepartmentPage;
