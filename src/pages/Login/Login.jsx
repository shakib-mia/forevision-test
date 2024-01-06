import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import caution from "./../../assets/icons/caution.svg"
import Construction from "../Construction/Construction";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false)


  const login = (e) => {
    e.preventDefault();
    setLoading(true)
    // console.log(e.target.password.value);
    // const userData = new FormData();

    // userData.append("user_email", e.target.email.value);
    // userData.append("user_pass", e.target.password.value);
    // https://api.forevisiondigital.in/
    axios
      .post("https://api.forevisiondigital.in/user-login", {
        email: e.target.email.value.toLowerCase(),
        password: e.target.password.value
      })
      .then(({ data }) => {
        if (data.token.length) {
          sessionStorage.setItem("token", data.token);

          // window.history.back();
          setToken(data.token);
          setUserData({ user_email: e.target.email.value })
          // prevRoute === '/signup' ? navigate("/signup-details") : navigate('/profile')
          if (prevRoute === '/signup' || data.details === null) {
            navigate("/signup-details")
          } else {
            // navigate("/signup-details")
            setShowMessage(true)

            setLoading(false)

            const config = {
              headers: {
                token: data.token
              }
            }
            axios.get("https://api.forevisiondigital.in/getUserData", config).then(({ data }) => {
              // console.log(data.data);
              if (data.data === null) {

                setUserData({ ...userData, user_email: e.target.email.value })
              } else {
                setTimeout(() => navigate('/'), 10000)
              }
              // console.log(data);
            })
          }
        }
      }).catch(err => {
        setLoading(false)
        toast.error(err.response.data.message, {
          position: 'bottom-center'
        })
      });
  };

  return (
    // <AuthBody
    //   heading="Login"
    //   altDescription="New in ForeVision Digital?"
    //   altText="Sign Up"
    //   altLink="/signup"
    //   onSubmit={login}
    // >
    //   {fields.map((props, id) => (
    //     <InputField {...props} key={id} containerClassName="mt-3" onChange={e => props.name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)} />
    //   ))}

    //   <div className="mt-3 mb-2 text-center">
    //     <Button type="submit" text={loading ? 'Logging in' : "Login"} disabled={loading || !email.length || !password.length} />
    //   </div>

    //   <div className="text-center">
    //     <Link
    //       to="/forgot-password"
    //       className="text-interactive-light text-button uppercase"
    //     >
    //       Forgot your password?
    //     </Link>
    //   </div>

    //   {showMessage ? <div className="fixed left-0 top-0 backdrop-blur w-screen h-screen flex justify-center items-center">
    //     <div className="w-11/12 xl:w-1/2 bg-white p-5 rounded shadow-xl flex flex-col justify-center items-center gap-2">

    //       <img src={caution} className="w-1/3" alt="caution" />
    //       <p className="text-interactive-light-destructive-focus text-heading-6 text-center justify-center items-center"> It may Take upto <b>Ten(10)</b> minutes to load your data. Be Patient.</p>
    //       <p className="w-full xl:w-9/12 mx-auto text-center text-paragraph-1 text-grey-dark flex">Check out our new music earnings system! If you hit a snag, let us know, and we'll fix it in around a week. Thanks!</p>

    //       <CountdownCircleTimer
    //         isPlaying
    //         duration={10}
    //         colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    //         colorsTime={[7, 5, 2, 0]}
    //         strokeWidth={8}
    //         size={100}
    //       >
    //         {({ remainingTime }) => <span className="text-heading-4-bold text-grey-dark">{remainingTime}</span>}
    //       </CountdownCircleTimer>
    //     </div>
    //   </div> : <></>}
    // </AuthBody>
    <Construction />
  );
};

export default Login;
