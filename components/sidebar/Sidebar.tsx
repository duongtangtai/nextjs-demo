import React, { MouseEventHandler, memo } from "react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarTitle,
  SidebarContent,
} from "./styled";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  handleSidebar?: MouseEventHandler<HTMLButtonElement>;
};

const Sidebar = ({ isOpen, handleSidebar }: Props) => {
  console.log("render sidebar");
  const menuArr = [
    {
      name: "User Management",
      path: "/user-management",
    },
    {
      name: "Role Management",
      path: "/role-management",
    },
  ];

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>
          <Link href={"/"} style={{ 
            textDecoration: "none", 
            fontWeight: "bold",
            color: "black",
        }}>
            OPUS CONTAINER
          </Link>
        </SidebarTitle>
        <SidebarMenu onClick={handleSidebar}>
          <AiOutlineMenu />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuArr.map((e) => (
          <Link key={e.path} href={e.path} style={{ 
            textDecoration: "none",
            fontWeight: "bold",
            color: "blue",
            padding: "5px 6px",
          }}>
            {e.name}
          </Link>
        ))}
      </SidebarContent>
    </SidebarContainer>
  );
};

export default memo(Sidebar);
