"use client"

import React, {memo, useEffect, useState } from "react";
import {
  NavbarContainer,
  NavbarInfoProject,
  NavbarInfoUser,
  NavbarInfoUserDetail,
} from "./styled";
import Logout from "../logout/Logout";
import { getCookie } from "cookies-next";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    username: "",
    email: "",
  });
  useEffect(() => {
    const userCookie : UserInfo = JSON.parse(getCookie("userInfo") as string)
    setUserInfo(userCookie)
  }, []);
  console.log("render navbar")

  return (
    <NavbarContainer>
      <NavbarInfoProject>OPUS CONTAINER</NavbarInfoProject>
      <NavbarInfoUser>
        <NavbarInfoUserDetail>
          <span className="key">USERNAME</span>
          <span className="value">{userInfo.username}</span>
        </NavbarInfoUserDetail>
        <NavbarInfoUserDetail>
          <span className="key">EMAIL</span>
          <span className="value">{userInfo.email}</span>
        </NavbarInfoUserDetail>
        <Logout />
      </NavbarInfoUser>
    </NavbarContainer>
  );
};

export default memo(Navbar)
