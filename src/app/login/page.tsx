"use client";

import { Col, Row, Button } from "antd";
import loginImg from "../../assets/login-img.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import {
  getUserInfo,
  isLoggedIn,
  storeUserInfo,
} from "@/services/auth.service";

type formValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  console.log(getUserInfo());

  console.log(isLoggedIn());

  const [userLogin] = useUserLoginMutation();
  //data get function
  const onSubmit: SubmitHandler<formValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);

      storeUserInfo({ accessToken: res?.data?.accessToken });
    } catch (error: any) {
      console.error(error.message);
    }
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
