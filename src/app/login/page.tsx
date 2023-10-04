"use client";

import { Col, Row, Button } from "antd";
import loginImg from "../../assets/login-img.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";

type formValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const onSubmit: SubmitHandler<formValues> = (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={9}>
        <Image src={loginImg} width={500} alt="Login Image" />
      </Col>

      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0",
          }}
        >
          First Login Your Account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div style={{ width: "65%" }}>
              <div>
                <FormInput label="User Id" name="id" type="text" size="large" />
              </div>
              <div
                style={{
                  margin: "15px 0",
                }}
              >
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  size="large"
                />
              </div>
            </div>

            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
