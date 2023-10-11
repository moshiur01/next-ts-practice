//type  for the form

import ChangePasswordUI from "@/components/ui/ChnagePassowrd";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const ChangePassword = () => {
  return <ChangePasswordUI />;
};

export default ChangePassword;
