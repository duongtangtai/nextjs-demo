"use client"

import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    position: fixed;
    background-color: transparent;
    right: 0px;
    top: 30px;
    font-size: 1.5rem;
    pointer-events: none;
`

const SlideInOut = keyframes`
    0%{
      transform: translateX(100%);
      opacity:0;
    }
    10% {
      transform: translateX(0%);
      opacity:1;
    }
    70% {
      transform: translateX(0%);
      opacity:1;
    }
    100% {
      transform: translateX(100%);
      opacity:0;
    }
`

export const MessageContainer = styled.div`
    max-width: 20rem;
    box-shadow: 0.2rem 0.2rem 2rem #0000001f;
    display: flex;
    flex-direction: column;
    animation: ${SlideInOut} 4s ease-in-out forwards;
`

type ToastTitleProps = {
  $type: string
}

export const ToastTitle = styled.div<ToastTitleProps>`
  flex:1;
  background-color: ${props =>
    props.$type === "success" ? "#28a745" :
    props.$type === "warning" ? "#ffc107" :
    props.$type === "error" ? "#dc3545" :
    "#138496"
  };
  color: white;
  font-size: large;
  font-weight: bold;
  padding: 0.2rem 1rem;
  text-transform: uppercase;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`

export const ToastMessage = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 0.2rem 1rem;
  font-size: medium;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
`