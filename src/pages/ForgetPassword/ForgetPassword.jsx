import React from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const resetPassword = (e) => {
    // codes fore reset password will go here
    e.preventDefault();

    const formData = new FormData();
    formData.append("emailId", e.target["forgot-email"].value);

    // axios.post('http://adztronaut.com/music/admin/api/forgotPassword', formData).then(({ data }) => {
    //   toast.success(data.message)
    // })

    axios.post("http://localhost:4000/reset-password", { user_email: e.target["forgot-email"].value }).then(({ data }) => console.log(data))
  };
  return (
    <AuthBody
      heading="Reset Password"
      altDescription="Already have an account?"
      altText="Log in"
      altLink="/login"
      onSubmit={resetPassword}
    >
      <InputField
        label="Email"
        placeholder="Enter your existing Email Address"
        containerClassName="mt-3"
        name="forgot-email"
      />

      <div className="mt-3 mb-2 text-center">
        <Button type="submit" text="Reset" />
      </div>
    </AuthBody>
  );
};

export default ForgetPassword;
