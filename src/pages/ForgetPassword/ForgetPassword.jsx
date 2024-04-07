import React, { useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
// import { Link } from "react-router-dom";

const ForgetPassword = () => {
  // const disabled =
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const resetPassword = (e) => {
    // codes fore reset password will go here
    setSending(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("emailId", e.target["forgot-email"].value);

    axios
      .post(backendUrl + "reset-password", {
        user_email: e.target["forgot-email"].value.toLowerCase(),
      })
      .then(({ data }) => {
        console.log(data);
        if (data.modifiedCount) {
          setSending(false);
          setSent(true);
          toast.success(
            "Password Set is Successful. Check your Email for Your Password",
            {
              position: "bottom-center",
            }
          );
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setSending(false);
      });
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
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="mt-3 mb-2 text-center">
        <Button
          type="submit"
          text={sending ? "Sending..." : sent ? "Sent" : "Reset"}
          disabled={!email.length || sending || sent}
        />
      </div>
    </AuthBody>
  );
};

export default ForgetPassword;
