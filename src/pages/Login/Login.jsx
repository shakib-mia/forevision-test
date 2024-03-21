import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const { prevRoute, setToken, setUserData } = useContext(ProfileContext);

  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   console.log(showMessage);
  // }, [showMessage]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(backendUrl + "user-login", {
        email: e.target.email.value.toLowerCase(),
        password: e.target.password.value,
      })
      .then(({ data }) => {
        // console.log(data?.token?.length);
        if (data?.token?.length > 0) {
          sessionStorage.setItem("token", data.token);
          if (prevRoute === "/signup" || data.details === null) {
            navigate("/signup-details");
          } else {
            // console.log(data);
            setShowMessage(true);

            setLoading(false);
            setTimeout(() => navigate("/"), 10000);
            setUserData(data.details);

            // const config = {
            //   headers: {
            //     token: data?.token,
            //   },
            // };
            // axios.get(backendUrl + "getUserData", config).then(({ data }) => {
            //   console.log(data?.data);
            //   if (data?.data === null) {
            //     setUserData({ ...userData, user_email: e.target.email.value });
            //   } else {
            //     setTimeout(() => navigate("/"), 10000);
            //   }
            // });
          }

          setToken(data.token);
          setUserData({ user_email: e.target.email.value });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <AuthBody
      heading="Login"
      altDescription="New in ForeVision Digital?"
      altText="Sign Up"
      altLink="/signup"
      onSubmit={login}
    >
      {fields.map((props, id) => (
        <InputField
          {...props}
          key={id}
          containerClassName="mt-3"
          onChange={(e) =>
            props.name === "email"
              ? setEmail(e.target.value)
              : setPassword(e.target.value)
          }
        />
      ))}

      <div className="mt-3 mb-2 text-center">
        <Button
          type="submit"
          text={loading ? "Logging in" : "Login"}
          disabled={loading || !email.length || !password.length}
        />
      </div>

      <div className="text-center">
        <Link
          to="/forgot-password"
          className="text-interactive-light text-button uppercase"
        >
          Forgot your password?
        </Link>
      </div>

      {showMessage ? <LoginMessage /> : <></>}
      {/* <LoginMessage /> */}
    </AuthBody>
  );
};

export default Login;
