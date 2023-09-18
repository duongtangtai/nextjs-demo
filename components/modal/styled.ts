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

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    animation: ${fadeIn} linear 0.3s;
`

export const ModalOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
`

export const ModalTitle = styled.div`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
`
export const ModalCloseContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
`
export const CloseModalBtn = styled.button`
    border: none;
    border-radius: 100%;
    background-color: white;
    &&:hover {
        cursor: pointer;
    }
`

export const ModalBody = styled.div`
    margin: auto;
    position: relative;
    z-index: 1;
    animation: ${growth} linear 0.3s;
    background-color: white;
    border-radius: 1rem;
`