import React, { useContext, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import image from "../../assets/images/not-found.svg"
import { toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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

  const [showMessage, setShowMessage] = useState(false)

  const login = (e) => {
    e.preventDefault();
    // console.log(e.target.password.value);
    const userData = new FormData();

    userData.append("user_email", e.target.email.value);
    userData.append("user_pass", e.target.password.value);
    console.log(prevRoute);

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
          // prevRoute === '/signup' ? navigate("/signup-details") : navigate('/profile')
          if (prevRoute === '/signup') {
            navigate("/signup-details")
          } else {
            setShowMessage(true);
            // Navigation will be /revenue on full version
            setTimeout(() => navigate('/'), 10000)
          }
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
      altDescription="New in ForeVision Digital?"
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

      {showMessage && <div className="fixed left-0 top-0 backdrop-blur w-screen h-screen flex justify-center items-center">
        <div className="w-1/2 h-1/2 bg-white p-3 flex flex-col justify-center items-center gap-2">
          {/* <div className="flex items-center justify-center gap-3"> */}
          <img src={image} alt="" />
          <p className="w-9/12 mx-auto text-center text-paragraph-1 text-grey-dark">This is a new system for you to see that how much you've earned from your music. We are constantly working for better user experience. Any inconvenience is deeply regretted. You can Notify us if you are having any trouble. We will fix it within approximately 7(seven) working days .</p>
          {/* </div> */}
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={8}
            size={100}
          >
            {({ remainingTime }) => <span className="text-heading-4-bold text-grey-dark">{remainingTime}</span>}
          </CountdownCircleTimer>
        </div>
      </div>}
    </AuthBody>
  );
};

export default Login;
