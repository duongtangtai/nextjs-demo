"use client"
import styled from 'styled-components';


export const NavbarContainer = styled.nav`
    height: 4vh;
    display: flex;
    align-content: space-between;
    font-size: rem;
    border-bottom: 1px solid #c4c3c2;
`

export const NavbarInfoProject = styled.section`
    flex: 1;
`

export const NavbarInfoUser = styled.section`
    flex: 1;
    justify-content: flex-end;
    display: flex;
`

export const NavbarInfoUserDetail = styled.section`
    padding: 0.2rem 1rem;
    border-left: 1px solid #c4c3c2;

    & .key {
        color: gray;
        margin-right: 0.5rem
    }

    & .value {
        font-weight: bold;
    }
`