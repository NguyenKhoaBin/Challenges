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
import { db, auth } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import slugify from "slugify";
import { useAuth } from "../Context/authContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email addess")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be least 8 characters or greater")
    .required("Please enter your password"),
  confirmpassword: yup
    .string()
    .min(8, "Your confirm password must be least 8 characters or greater")
    .required("Please enter your confirm password"),
});

const SignUpPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) return navigate("/");
    console.log("render");
  }, [userInfo, navigate]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCfmPassword, setShowCfmPassword] = useState(false);

  const handleSignUp = async (values) => {
    if (values.password !== values.confirmpassword) {
      return toast.error("Password and confirm password are not the same!");
    }
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.email,
      photoURL:
        "https://images.unsplash.com/photo-1517012021249-a130aa959065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGF0dG9vJTIwYm95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: values.email,
      password: values.password,
      username: slugify(values.email, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1517012021249-a130aa959065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGF0dG9vJTIwYm95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",

      createdAt: serverTimestamp(),
    });
    toast.success("Create account successfully");
    navigate("/");
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  return (
    <div className="bg-[#FCFCFD] h-full w-full  py-10">
      <div className=" mx-auto w-full max-w-[550px] rounded-sm bg-[#FFFFFF] px-[50px] py-[50px]">
        <div className="flex flex-col gap-3 mb-8 text-center">
          <h2 className="  font-[500] text-3xl">Sign Up</h2>
          <p className="text-[#808191] ">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="text-[#1DC071] cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormGroup>
            <Label forHtml={"email"}>Email *</Label>
            <Input
              control={control}
              name="email"
              placeholder="example@gmail.com"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label forHtml={"password"}>Password *</Label>
            <Input
              control={control}
              name="password"
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
            >
              <IconEye
                isOpen={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              ></IconEye>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label forHtml={"confirmpassword"}>Confirm password *</Label>
            <Input
              control={control}
              name="confirmpassword"
              placeholder="Confirm password"
              type={showCfmPassword ? "text" : "password"}
            >
              <IconEye
                isOpen={showCfmPassword}
                onClick={() => setShowCfmPassword(!showCfmPassword)}
              ></IconEye>
            </Input>
          </FormGroup>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="mt-2"
          >
            Create my account
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
