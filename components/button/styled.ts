"use client"

import styled from "styled-components"

type Props = {
    $state: "active" | "disabled"
}

export const ButtonContainer = styled.button<Props>`
    background-color: ${(props) => props.$state === "active" ? '#4177C8' : '#8498b7'};
    color: white;
    border: 0.1rem solid transparent;
    border-radius: 0.2rem;
    padding: 0.2rem 0.4rem;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    cursor: ${(props) => props.$state === "active" ? 'pointer' : 'auto'};
    box-shadow: 0.1rem 0.1rem gray;
    opacity: 0.9;
    
    &:hover {
        background-color: ${(props) => props.$state === "active" ? '#3b7dd3' : ''};
    }

    &:active {
        opacity: ${(props) => props.$state === "active" ? '1' : '0.9'};
    }
`