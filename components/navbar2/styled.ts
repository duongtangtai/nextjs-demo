"use client"

import styled from "styled-components"

export const NavbarContainer = styled.div`
    height: 2rem;
    display: flex;
    flex-direction: row;
`

type SidebarParams = {
    isSidebarOpen?: boolean;
}

export const NavbarMenu = styled.button<SidebarParams>`
    cursor: pointer;
    padding: 0.4rem 0.7rem;
    background-color: white;
    border: none;
    border-right: 1px solid #c4c3c2;
    border-bottom: 1px solid #c4c3c2;
    border-left: 1px solid #c4c3c2;
    margin-left: ${props => props.isSidebarOpen ? "100px" : "0"};
    transition: all 0.3s ;
`

export const NavbarTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    font-weight: bold;
`

export const NavbarBtnContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 0.5rem;
`