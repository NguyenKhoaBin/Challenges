import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { auth } from "../Firebase/firebaseConfig";
import IconAdd from "../Icon/IconAdd";
import IconFlag from "../Icon/IconFlag";
import IconLogout from "../Icon/IconLogout";
import IconMenu from "../Icon/IconMenu";
const menuLink = [
  {
    name: "Add New",
    url: "/add-new",
    icon: <IconAdd></IconAdd>,
  },
  {
    name: "Challenges",
    url: "/challenges",
    icon: <IconFlag></IconFlag>,
  },
];
const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [showMenuMini, setShowMenuMini] = useState(false);
  const styleNavlink =
    "flex items-center justify-center gap-2 font-[500] text-xl cursor-pointer hover:opacity-[.7]";
  return (
    <div className="bg-white z-50 sticky flex   justify-between  items-center top-0 h-[100px] w-full py-5 px-[75px] border-b border-b-[#ccc] mini:px-5 mini:relative">
      {showMenuMini && (
        <div
          onClick={() => setShowMenuMini(!showMenuMini)}
          className="absolute left-0 right-0 w-full z-10 h-[calc(100vh-100px)] bg-black bg-opacity-[.2] top-full"
        ></div>
      )}
      <div className="flex items-center justify-start flex-1 gap-5 mini:gap-0">
        <span
          className="hidden cursor-pointer mini:block "
          onClick={() => setShowMenuMini(!showMenuMini)}
        >
          <IconMenu></IconMenu>
        </span>
        <div
          className="flex items-center justify-start gap-3 cursor-pointer mini:flex-1 mini:justify-center mini:pr-8"
          onClick={() => navigate("/")}
        >
          <img
            src="https://media.istockphoto.com/vectors/vintage-black-color-hexagon-label-banner-with-word-challenge-on-white-vector-id1320350485?k=20&m=1320350485&s=612x612&w=0&h=tfW4EMufxmR729ClXglYSPW_VKPO1-ICGhO_hKkWvL0="
            alt="Logo"
            className="object-cover h-10 rounded-full w-15"
          />
          <span className="text-xl font-[500] ">Challenges Yourself</span>
        </div>

        <div className="flex items-center justify-center flex-1 w-full gap-5 transition-all mini:hidden">
          {menuLink.map((item) => (
            <NavLink
              to={item.url}
              key={item.url}
              className={({ isActive }) =>
                isActive ? `${styleNavlink} text-green-500` : `${styleNavlink} `
              }
            >
              {item.name} <span>{item.icon}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {userInfo?.email && (
        <div className="flex items-center gap-5 text-[18px] mini:hidden">
          <p className="text-green-500">
            Wellcome Back {userInfo?.displayName?.split("@")[0]}
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-[#9c8383] hover:opacity-[.7] cursor-pointer font-[500]">
            {userInfo?.email && (
              <span onClick={() => auth.signOut()}>Logout</span>
            )}
            <IconLogout></IconLogout>
          </div>
        </div>
      )}
      {showMenuMini && (
        <div className="absolute left-0 right-0 z-20 w-full bg-white top-full ">
          {menuLink.map((item) => (
            <div className=" border-b border-b-[#ccc]" key={item.url}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? `${styleNavlink} text-green-500 py-5`
                    : `${styleNavlink} py-5`
                }
              >
                {item.name} <span>{item.icon}</span>
              </NavLink>
            </div>
          ))}
          <div className="flex items-center justify-center gap-2 py-5 text-lg text-[#9c8383] hover:opacity-[.7] cursor-pointer font-[500]">
            {userInfo?.email && (
              <span onClick={() => auth.signOut()}>Logout</span>
            )}
            <IconLogout></IconLogout>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
