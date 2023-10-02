"use client"

import React, { useState } from "react";
import {
  ControlButtonContainer,
  ControlButtonContent,
  ControlButtonLogo,
} from "./styled";
import Link from "next/link";
import { BiSolidDownArrow } from "react-icons/bi";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { API_AUTH_LOGOUT } from "@/lib/utils";

const ControlButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleControlBtnOnBlur = (e: React.FocusEvent) => {
    if (e.target.contains(e.relatedTarget)) {
      //don't close
      return;
    }
    setIsOpen(false);
  };
  const handleLogout = async () => {
    //check userInfo or Session
    deleteCookie("userInfo");
    await fetch(API_AUTH_LOGOUT, {
      method: "POST",
    });
    signOut();
  };
  console.log("render control button");
  return (
    <ControlButtonContainer
      onClick={() => setIsOpen(!isOpen)}
      onBlur={handleControlBtnOnBlur}
      tabIndex={0}
    >
      <ControlButtonLogo $isOpen={isOpen}>
        <BiSolidDownArrow />
      </ControlButtonLogo>
      {isOpen && (
        <ControlButtonContent onClick={() => setIsOpen(true)}>
          <Link
            href={"/change-password"}
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onMouseOver={() => {
              setIsOpen(true);
            }}
          >
            Change Password
          </Link>
          <Link
            href={"#"}
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onClick={handleLogout}
          >
            Logout
          </Link>
        </ControlButtonContent>
      )}
    </ControlButtonContainer>
  );
};

export default ControlButton;
