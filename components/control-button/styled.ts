"use client"

import styled from "styled-components";

export const ControlButtonContainer = styled.div`
    position: relative;
    padding: 10px 2px;
    cursor: pointer;
    pointer-events: all;
    width: 2rem;
    border-left: 1px solid black;
    z-index: 50;
`


export const ControlButtonLogo = styled.span<{$isOpen: boolean}>`
    position: absolute;
    top: 20%;
    left: 30%;
    transition: all 0.2s ease-in;
    transform: ${props => props.$isOpen ? "rotate(180deg) translateY(5px)" : "rotate(0)"};
`

export const ControlButtonContent = styled.div`
    position: absolute;
    background-color: #f7f7f7;
    box-shadow: 2px 5px 5px #e5e5e5;
    right: 0;
    top: 100%;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
    :hover {
        background-color: #8a7bfc;
    }
`