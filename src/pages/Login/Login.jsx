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
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  // if (loading) {
  //   console.log(loading);
  // }

  useEffect(() => {
    if (
      sessionStorage.getItem("token") !== null &&
      sessionStorage.getItem("token").length > 0
    ) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (user) {
      // console.log(user.user);
      const { email } = user.user;
      sessionStorage.setItem("user", JSON.stringify(user.user));

      axios
        .get(`${backendUrl}handle-firebase-login/${email}`)
        .then(({ data }) => {
          if (data?.token?.length > 0) {
            sessionStorage.setItem("token", data.token);
            if (data.details === null) {
              navigate("/signup-details");
            } else {
              // console.log(data);
              // setShowMessage(true);

              setIsLoading(false);

              navigate("/");
              // setTimeout(() => navigate("/"), 10000);
              setUserData(data.details);
              window.location.reload();

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
            setUserData({ user_email: email, emailId: email });
          }
        })
        .catch((err) => {
          // setIsLoading(false);
          toast.error(err.response?.data?.message, {
            position: "bottom-center",
          });
        });
    }
    if (error) {
      console.log(error);
    }
  }, [user, error]);

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
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   console.log(showMessage);
  // }, [showMessage]);

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(backendUrl + "user-login", {
        email: e.target.email.value.toLowerCase(),
        password: e.target.password.value,
      })
      .then(({ data }) => {
        // console.log(data);
        // console.log(data?.token?.length);
        if (data?.token?.length > 0) {
          sessionStorage.setItem("token", data.token);
          if (prevRoute === "/signup" || data.details === null) {
            navigate("/signup-details");
          } else {
            // console.log(data);
            // setShowMessage(true);

            setIsLoading(false);
            navigate("/");
            // setTimeout(() => navigate("/"), 10000);
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
        setIsLoading(false);
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
      // whiteContainerClass={"!w-1/3"}
      onSubmit={login}
    >
      {/* <div className="w-1/2 mx-auto"> */}
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

      <div className="mt-3 text-center">
        <Button
          type="submit"
          text={isLoading ? "Logging in" : "Login"}
          disabled={isLoading || !email.length || !password.length}
        />
      </div>

      <div className="my-2 flex items-center gap-3 mx-auto">
        <div className="h-[1px] w-full bg-grey-light"></div>
        <div>OR</div>
        <div className="h-[1px] w-full bg-grey-light"></div>
      </div>

      <button
        type="button"
        className="mb-2 flex gap-2 text-heading-6 w-full font-semibold items-center border border-grey-light py-2 rounded-lg justify-center mx-auto hover:bg-interactive-light transition hover:text-white"
        onClick={() => signInWithGoogle()}
      >
        <FcGoogle />
        <span className="font-sans">Continue with Google</span>
      </button>
      {/* </div> */}

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
