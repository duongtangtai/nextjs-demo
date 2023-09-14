"use client";

import React, {memo, MouseEventHandler } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  NavbarContainer,
  NavbarMenu,
  NavbarTitle,
  NavbarBtnContainer,
} from "./styled";

type Props = {
  title: string;
  children?: React.ReactNode;
  handleSidebar?: MouseEventHandler<HTMLButtonElement>;
};

const Navbar2 = ({ title, children, handleSidebar}: Props) => {
  console.log("render navbar2");

  return (
    <NavbarContainer>
      <NavbarMenu
        onClick={handleSidebar}
      >
        <AiOutlineMenu />
      </NavbarMenu>
      <NavbarTitle>{title}</NavbarTitle>
      <NavbarBtnContainer>{children}</NavbarBtnContainer>
    </NavbarContainer>
  );
};

export default memo(Navbar2);
