"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

//type  for the form

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordUI = () => {
  //submit handler

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div
      style={{
        margin: "100px 0",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          margin: "15px 0px",
        }}
      >
        Reset Password
      </h1>

      <Form submitHandler={onSubmit}>
        <div>
          <div
            style={{
              margin: "10px 0px",
            }}
          >
            <FormInput
              name="oldPassword"
              label="Old Password"
              type="password"
              size="large"
            />
          </div>
          <FormInput
            name="newPassword"
            label="New Password"
            type="password"
            size="large"
          />

          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "10px 0px", fontWeight: 700 }}
          >
            Change Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordUI;
