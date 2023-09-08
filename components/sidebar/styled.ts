"use client"

import styled from "styled-components"

export const SidebarContainer = styled.div`
    height: 2rem;
    display: flex;
    flex-direction: row;
`

export const SidebarMenu = styled.button`
    cursor: pointer;
    padding: 0.4rem 0.7rem;
    background-color: white;
    border: none;
    border-right: 1px solid #c4c3c2;
    border-bottom: 1px solid #c4c3c2;
`

export const SidebarTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    font-weight: bold;
`

export const SidebarBtnContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 0.5rem;
`