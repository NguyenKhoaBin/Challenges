import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Header from "../Layout/Header";

const HomePages = () => {
  document.title = "Learn English";
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo === null) return navigate("/sign-up");
  }, [userInfo, navigate]);
  return (
    <div className="relative w-full h-full min-h-[calc(100vh)] mini:bg-imageHomeMini mini:bg-center bg-imageHome bg-no-repeat bg-cover">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePages;
