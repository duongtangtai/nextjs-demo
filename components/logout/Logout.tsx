"use client";

import React from "react";
import { ButtonLogout } from "./styled";
import { signOut } from "next-auth/react";
import { deleteCookie} from "cookies-next";

const Logout = () => {
  const handleLogout = () => {
    //check userInfo or Session
    deleteCookie("userInfo")
    deleteCookie("access_token")
    deleteCookie("refresh_token")
    signOut();
  };

  return <ButtonLogout onClick={handleLogout}>LOGOUT</ButtonLogout>;
};

export default Logout;
