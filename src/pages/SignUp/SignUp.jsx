import React, { useContext, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData, setPrevRoute } = useContext(ProfileContext);
  // console.log(location.pathname);

  const fields = [
    {
      id: "signup-email",
      name: "user_email",
      label: "Email",
      type: "email",
      placeholder: "Email Address",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "signup-pass",
      name: "user_password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      onChange: (e) => setPassword(e.target.value),
    },
    {
      id: "confirm-password",
      name: "user_confirm_password",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter Address",
      onChange: (e) => setConfirmPass(e.target.value),
    },
  ];

  const signup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);




    axios.post("https://adztronaut.com/music/admin/api/userRegistration", formData).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setUserData({ ...userData, email: e.target.user_email.value, userId: res.data.data })
        navigate("/login");
        setPrevRoute(location.pathname)
        navigate("/signup-details")
      } else {
        toast.error(res.data.message)
      }
    })
  };

  return (
    <AuthBody
      heading="Sign Up"
      altDescription="Already Have an Account?"
      altText="Log in"
      altLink="/login"
      onSubmit={signup}
      id="signup-page"
    >
      {fields.map((props, id) => (
        <InputField {...props} key={id} containerClassName="mt-3" />
      ))}

      <div className="mt-3 mb-2 text-center">
        <Button
          type="submit"
          text="Sign Up"
          disabled={
            !(email.length > 0 && password.length && password === confirmPass)
          }
        />
      </div>

      {/* <div className="text-center">
        <Link
          to="/login"
          className="text-interactive-light text-button uppercase"
        >
          Already have an account?
        </Link>
      </div> */}
    </AuthBody>
  );
};

export default SignUp;
