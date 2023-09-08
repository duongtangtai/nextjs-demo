"use client"

import styled from "styled-components"

type Props = {
    $boxWidth: string
}

export const SearchFieldContainer = styled.div<Props>`
    background-color: none;
    display: flex;
    align-items: center;

    & label {
        font-weight: 500;
    }

    & input {
        margin-left: 0.4rem;
        margin-right: 2rem;
        width: ${(props) => props.$boxWidth === "" ? "5rem" : props.$boxWidth};
        border-radius: 0.2rem;
        border: none;
        outline: none;
        box-shadow: 0.5px 0.5px gray;
        padding: 0.2rem 0.3rem;
    }
`