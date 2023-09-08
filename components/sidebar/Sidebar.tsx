import React, {memo} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SidebarContainer, SidebarMenu, SidebarTitle, SidebarBtnContainer} from "./styled";

const Sidebar = ({title, children }: { title: string, children: React.ReactNode }) => {
  console.log("render sidebar")
  return (
    <SidebarContainer>
      <SidebarMenu>
        <AiOutlineMenu />
      </SidebarMenu>
      <SidebarTitle>
        {title}
      </SidebarTitle>
      <SidebarBtnContainer>
        {children}
      </SidebarBtnContainer>
    </SidebarContainer>
  );
};

export default memo(Sidebar);
