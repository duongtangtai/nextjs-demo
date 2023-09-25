"use client"

import styled from "styled-components"

type SidebarParams = {
    $isOpen : boolean
}

export const SidebarContainer = styled.div<SidebarParams>`
    position: absolute;
    background-color: #d3cfcf;
    height: 100vh;
    width: 25vh;
    transform: ${props => props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    box-shadow: 5px;
    z-index: 10;
`

export const SidebarHeader = styled.section`
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid black;
`

export const SidebarTitle = styled.span`
    font-weight: bold;
    text-align: center;
    padding: 5px 6px;
`

export const SidebarMenu = styled.button`
    padding: 0.4rem 0.7rem;
    background-color: white;
    border: none;
    border-right: 1px solid #c4c3c2;
    border-bottom: 1px solid #c4c3c2;
    border-left: 1px solid #c4c3c2;
    cursor: pointer;
    transition: all 0.3s ;
`

export const SidebarContent = styled.section`
    display: flex;
    flex-direction: column;
    padding: 5px 6px;
`

export const SidebarLink = styled.span`
    font-weight: bold;
    color: blue;
    padding: 5px 6px;
`