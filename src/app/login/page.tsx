import LoginPageUI from "@/components/ui/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Management - Login",
  description: "This is the login page for our website",
};
const LoginPage = () => {
  return <LoginPageUI />;
};

export default LoginPage;
