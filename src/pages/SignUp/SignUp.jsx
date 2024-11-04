import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const { setUId, setUserData, userData } = useContext(ProfileContext);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // console.log(location.pathname);
  useEffect(() => {
    if (user) {
      console.log(user);
      setUserData({
        ...userData,
        user_email: user.user.email,
        last_name:
          user.user.displayName.split(" ")[
            user.user.displayName.split(" ").length - 1
          ],

        first_name: user.user.displayName
          .split(" ")
          .slice(0, user.user.displayName.split(" ").length - 1),
      });
      // console.log(userData);

      const signupData = {
        email: user.user.email,
        first_name: user.user.displayName
          .split(" ")
          .slice(0, user.user.displayName.split(" ").length - 1)
          .join(" "),
        last_name:
          user.user.displayName.split(" ")[
            user.user.displayName.split(" ").length - 1
          ],
        display_image: user.user.photoURL,
      };

      axios
        .post(backendUrl + "user-signup", signupData)
        .then(({ data }) => {
          if (data.acknowledged) {
            setUId(data.insertedId);
            // console.log(signupData.email);
            toast.success("Signup Successful. Please Login Now.");
            setUserData({ ...userData, user_email: signupData.email });
            navigate("/signup-details");
          }
        })
        .catch((err) =>
          toast.error(err.response.data, {
            position: "bottom-center",
          })
        );
    }
  }, [user]);

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

    const signupData = {
      email: e.target["user_email"].value.toLowerCase(),
      password: e.target["user_password"].value,
    };

    axios
      .post(backendUrl + "user-signup", signupData)
      .then(({ data }) => {
        if (data.acknowledged) {
          setUId(data.insertedId);

          setUserData({ ...userData, user_email: signupData.email });
          navigate("/signup-details");
        }
      })
      .catch((err) =>
        toast.error(err.response.data, {
          position: "bottom-center",
        })
      );

    // const formData = new FormData(e.target);

    // axios.post("https://beta.forevisiondigital.com/admin/api/userRegistration", formData).then(res => {
    //   if (res.data.success) {
    // (res.data);
    //     setUserData({ ...userData, email: e.target.user_email.value, userId: res.data.data })
    //     navigate("/login");
    //     setPrevRoute(location.pathname)
    //     // navigate("/signup-details")
    //   } else {
    //     toast.error(res.data.message)
    //   }
    // })
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

      <div className="text-center">
        <Link
          to="/login"
          className="text-interactive-light text-button uppercase"
        >
          Already have an account?
        </Link>
      </div>
    </AuthBody>
  );
};

export default SignUp;
