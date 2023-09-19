"use client"

import styled from "styled-components"

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.8rem;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Label = styled.label`
    font-weight: 600;
    padding: 0.3rem 0;
    text-transform: capitalize;
`

export const Input = styled.input`
    padding: 0.3rem 0.5rem;
    margin-bottom: 0.4rem;
    border: 1px solid gray;
    padding: 0.3rem;
    border-radius: 0.3rem;
    &&:focus {
        outline: none;
        box-shadow: 0px 0px 8px blue;
    }
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
    transition: all 0.1s ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }
`