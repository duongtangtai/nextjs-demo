"use client"

import styled from "styled-components"

export const LoginContainer = styled.div`
    position: absolute;
    top: 25vh;
    right: 4vh;
    left: 158vh;
    bottom: 4vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
    padding-right: 2rem;
    padding-left: 2rem;
    padding-bottom: 8rem;
    border-radius: 3vh;
    line-height: 1.3rem;
`

export const LoginTitle = styled.section`
    text-align: left;
    line-height: 1.3rem;
`

export const LoginForm = styled.form`
    
`


type LoginFieldProps = {
    $flexDirection: "row" | "column"
}

export const LoginField = styled.div<LoginFieldProps>`
    display: flex;
    flex-direction: ${(props) => props.$flexDirection};

    &.checkbox-remember {
        margin-top: 0.4rem;
    }

    &.checkbox-remember input {
        margin-top: 0.2rem;
        margin-right: 0.3rem;
    }

    &.checkbox-remember span {
        font-size: 0.8rem;
        margin-right: 1rem;
    }

    &.checkbox-remember a {
        flex-grow: 1;
        display: flex;
        justify-content: end;
        font-size: 0.8rem;
    }
`

export const Label = styled.label`
    font-weight: bold;
    margin: 0.5rem 0;
`

export const Input = styled.input`
    padding: 0.3rem 0.5rem;
    margin-bottom: 0.4rem;
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

    & svg {
        margin-right: 0.5rem;
    }
`

export const SignUpSection = styled.section`
    text-align: center;

    & span {
        padding-right: 1rem;
    }

    & a {
        color: blue;
    }
`