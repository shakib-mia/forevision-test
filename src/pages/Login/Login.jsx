import React, { useContext } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
// import image from "../../assets/images/not-found.svg"
import { toast } from "react-toastify";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
  const { /*setUserData*/ prevRoute, setToken, setUserData, userData } = useContext(ProfileContext)
  // const {  } = useContext(ProfileContext);

  const navigate = useNavigate();

  // const [showMessage, setShowMessage] = useState(false)

  const login = (e) => {
    e.preventDefault();
    // console.log(e.target.password.value);
    // const userData = new FormData();

    // userData.append("user_email", e.target.email.value);
    // userData.append("user_pass", e.target.password.value);
    axios
      .post("https://forevision-digital.onrender.com/user-login", {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then(({ data }) => {
        if (data.token.length) {
          sessionStorage.setItem("token", data.token);
          // window.history.back();
          setToken(data.token);
          // prevRoute === '/signup' ? navigate("/signup-details") : navigate('/profile')
          if (prevRoute === '/signup') {
            navigate("/signup-details")
          } else {
            // setShowMessage(true);
            // Navigation will be /revenue on full version
            // setTimeout(() => navigate('/'), 10000)
            // navigate("/");
            const config = {
              headers: {
                token: data.token
              }
            }
            axios.get("https://forevision-digital.onrender.com/getUserData", config).then(({ data }) => {
              // console.log(data.data);
              if (data.data === null) {
                console.log(userData);

                setUserData({ ...userData, user_email: e.target.email.value })

                navigate("/signup-details")
              } else {
                navigate("/")
              }
              // console.log(data);
            })
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

      {/* {showMessage && <div className="fixed left-0 top-0 backdrop-blur w-screen h-screen flex justify-center items-center">
        <div className="w-11/12 xl:w-1/2 xl:h-1/2 bg-white p-3 flex flex-col justify-center items-center gap-2">
        
          <img src={image} alt="" />
          <p className="w-full xl:w-9/12 mx-auto text-center text-paragraph-1 text-grey-dark">This is a new system for you to see that how much you've earned from your music. We are constantly working for better user experience. Any inconvenience is deeply regretted. You can Notify us if you are having any trouble. We will fix it within approximately 7(seven) working days .</p>
  
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
      </div>} */}
    </AuthBody>
  );
};

export default Login;
