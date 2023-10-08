import LoginPageUI from "@/components/ui/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Management - Login",
  description: "Generated by create next app",
};
const LoginPage = () => {
  return <LoginPageUI />;
};

export default LoginPage;
