import React, { useContext } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";

const Login = () => {
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email Address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
    },
  ];
  const { setUserData, prevRoute, setToken } = useContext(ProfileContext)
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    // console.log(e.target.password.value);
    const userData = new FormData();

    userData.append("user_email", e.target.email.value);
    userData.append("user_pass", e.target.password.value);

    axios
      .post("https://adztronaut.com/music/admin/api/login", userData)
      .then(({ data }) => {
        // console.log(data);
        if (data.status === "Login successful") {
          // console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.removeItem("token");
          localStorage.setItem("token", data.token);
          // window.history.back();
          setToken(data.token)
          setUserData(data.user)
          prevRoute === '/signup' ? navigate("/signup-details") : navigate('/profile')
        }
      }).catch(err => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: 'bottom-center'
        })
      });
  };

  return (
    <AuthBody
      heading="Login"
      altDescription="New in Forevision Digital?"
      altText="Sign Up"
      altLink="/signup"
      onSubmit={login}
    >
      {fields.map((props, id) => (
        <InputField {...props} key={id} containerClassName="mt-3" />
      ))}

      <div className="mt-3 mb-2 text-center">
        <Button type="submit" text="Login" />
      </div>

      <div className="text-center">
        <Link
          to="/forgot-password"
          className="text-interactive-light text-button uppercase"
        >
          Forgot your password?
        </Link>
      </div>
    </AuthBody>
  );
};

export default Login;
