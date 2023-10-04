import React, { memo, useContext, useEffect, useState } from "react";
import {
  NavbarContainer,
  NavbarInfoProject,
  NavbarInfoUser,
  NavbarInfoUserDetail,
} from "./styled";
import { getCookie } from "cookies-next";
import ControlButton from "../control-button/ControlButton";
import io from 'socket.io-client'
import { ToastContext } from "@/context/toast/ToastProvider";

const Navbar = () => {
  console.log("render navbar");
  const toast = useContext(ToastContext)
  let userInfo: UserInfo = {
    username: "",
    email: "",
    id: "",
    roles: "",
  };
  if (typeof window !== "undefined") {
    userInfo = JSON.parse(getCookie("userInfo") as string);
  }
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socket.on("onNotification", (data) => {
      console.log("onNotification");
      console.log(data);
      toast.notify({
        type: "info",
        message: data,
      });
    });
    return () => {
      console.log("clear socket")
      socket.disconnect();
    }
  }, []);
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

export default memo(Navbar);
