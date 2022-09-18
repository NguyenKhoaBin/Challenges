import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import IconEye from "../Icon/IconEye";
import FormGroup from "../Input/FormGroup";
import Input from "../Input/Input";
import Label from "../Input/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email addess")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  const handleSignIn = async (values) => {
    // if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
    // console.log(values);
  };
  useEffect(() => {
    if (userInfo?.email) navigate("/");
  });
  return (
    <div className="bg-[#FCFCFD] h-full w-full  flex items-center justify-center py-[100px]">
      <div className=" mx-auto w-full max-w-[550px] rounded-sm bg-[#FFFFFF] px-[50px] py-[50px]">
        <div className="flex flex-col gap-3 mb-8 text-center">
          <h2 className="  font-[500] text-3xl">Sign In</h2>
          <p className="text-[#808191] ">
            Do not have an account?{" "}
            <Link to={"/sign-up"} className="text-[#1DC071] cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <FormGroup>
            <Label forHtml={"email"}>Email *</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label forHtml={"password"}>Password *</Label>
            <Input
              control={control}
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            >
              <IconEye
                isOpen={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              ></IconEye>
            </Input>
          </FormGroup>

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="mt-2"
          >
            Login
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;
