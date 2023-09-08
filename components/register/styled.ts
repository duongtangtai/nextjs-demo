"use client"

import styled from "styled-components"

export const RegisterContainer = styled.div`
    position: absolute;
    top: 20vh;
    right: 4vh;
    left: 158vh;
    bottom: 4vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    padding-bottom: 8rem;
    border-radius: 3vh;
    line-height: 1.3rem;
`

export const RegisterTitle = styled.section`
    text-align: left;
    line-height: 1.3rem;
`

export const RegisterForm = styled.form`
`


type RegisterFieldProps = {
    $flexDirection: "row" | "column"
    $position?: "relative"
}

export const RegisterField = styled.div<RegisterFieldProps>`
    display: flex;
    flex-direction: ${(props) => props.$flexDirection};
    position:  ${(props) => props.$position};
`

export const Label = styled.label`
    font-weight: bold;
    margin: 0.5rem 0;
`

export const Input = styled.input`
    padding: 0.3rem 0.5rem;
    margin-bottom: 0.4rem;
    height: 1rem;
`

export const EyeIconContainer = styled.div`
    position: absolute;
    right: 0.6rem;
    bottom: 0.5rem;
    cursor: pointer;
`

type ButtonProps = {
    $bgcolor: string,
    $color: string,
}

export const Button = styled.button<ButtonProps>`
    background-color: ${(props) => props.$bgcolor};
    color:  ${(props) => props.$color};;
    display: block;
    width: 100%;
    padding: 0.7rem 0;
    margin: 0.7rem 0;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SignInSection = styled.section`
    text-align: center;

    & span {
        padding-right: 1rem;
    }

    & a {
        color: blue;
    }
`