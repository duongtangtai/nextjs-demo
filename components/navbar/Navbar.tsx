import React, {memo, useEffect, useState } from "react";
import {
  NavbarContainer,
  NavbarInfoProject,
  NavbarInfoUser,
  NavbarInfoUserDetail,
} from "./styled";
import { getCookie } from "cookies-next";
import ControlButton from "../control-button/ControlButton";


const Navbar = () => {
  console.log("render navbar")
  let userInfo : UserInfo = {
    username: "",
    email: "",
    id: "",
    roles: "",
  }
  if (typeof window !== "undefined") {
    userInfo = JSON.parse(getCookie("userInfo") as string);
  }

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
        <ControlButton />
      </NavbarInfoUser>
    </NavbarContainer>
  );
};

export default memo(Navbar)
