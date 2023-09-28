"use client"

import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const growth = keyframes`
    from {
        transform: scale(0.7);
    }
    to {
        transform: scale(1);
    }
`

export const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    animation: ${fadeIn} linear 0.3s;
    z-index: 10;
`

export const AlertOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
`

export const AlertBody = styled.div`
    margin-left: auto;
    margin-top: 15vh;
    margin-right: auto;
    margin-bottom: auto;
    position: relative;
    z-index: 1;
    animation: ${growth} linear 0.3s;
    background-color: white;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
`

export const AlertMessage = styled.div`
    max-width: 200px;
    margin: 0.5rem 0.3rem;
    font-weight: 500;
`

type ButtonProps = {
    $bgcolor: string,
    $color: string,
}

export const Button = styled.button<ButtonProps>`   
    background-color: ${(props) => props.$bgcolor};
    color:  ${(props) => props.$color};;
    width: 100%;
    padding: 0.7rem 0;
    margin: 0.7rem 0.2rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s ease-in-out;
    &:hover {
        transform: translateY(-2px);
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`