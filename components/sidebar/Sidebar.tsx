"use client";
import React, { MouseEventHandler, memo, useEffect, useState } from "react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarTitle,
  SidebarContent,
} from "./styled";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { ROLE_ADMIN, ROLE_MANAGER } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  handleSidebar?: MouseEventHandler<HTMLButtonElement>;
};

const Sidebar = ({ isOpen, handleSidebar }: Props) => {
  //user infomation
  let userInfo: UserInfo = JSON.parse(getCookie("userInfo") as string);
  console.log("render sidebar");
  let menuArr;
  if (userInfo.roles.includes(ROLE_ADMIN)) {
    menuArr = [
      {
        name: "Role Management",
        path: "/role-management",
      },
      {
        name: "User Management",
        path: "/user-management",
      },
      {
        name: "Vessel Management",
        path: "/vessel-management",
      },
    ];
  } else if (userInfo.roles.includes(ROLE_MANAGER)) {
    menuArr = [
      {
        name: "User Management",
        path: "/user-management",
      },
      {
        name: "Vessel Management",
        path: "/vessel-management",
      },
    ];
  } else {
    menuArr = [
      {
        name: "Vessel Management",
        path: "/vessel-management",
      },
    ];
  }

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>
          <Link
            href={"/"}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "black",
            }}
          >
            OPUS CONTAINER
          </Link>
        </SidebarTitle>
        <SidebarMenu onClick={handleSidebar}>
          <AiOutlineMenu />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {userInfo &&
          menuArr.length > 0 &&
          menuArr.map((e) => (
            <Link
              key={e.path}
              href={e.path}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "blue",
                padding: "5px 6px",
              }}
            >
              {e.name}
            </Link>
          ))}
        {menuArr.length == 0 && <p>Loading...</p>}
      </SidebarContent>
    </SidebarContainer>
  );
};

export default memo(Sidebar);
