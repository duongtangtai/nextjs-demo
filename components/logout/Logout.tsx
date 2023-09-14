"use client";

import React from "react";
import { ButtonLogout } from "./styled";
import { signOut } from "next-auth/react";
import { deleteCookie} from "cookies-next";
import { API_AUTH_LOGOUT } from "@/lib/utils";

const Logout = () => {
  const handleLogout = async () => {
    //check userInfo or Session
    deleteCookie("userInfo")
    await fetch(API_AUTH_LOGOUT, {
      method: "POST"
    })
    signOut();
  };

  return <ButtonLogout onClick={handleLogout}>LOGOUT</ButtonLogout>;
};

export default Logout;
