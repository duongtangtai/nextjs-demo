"use client"

import styled from "styled-components"

export const TableContainer = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
`

export const MTable = styled.table`
    width: 99%;
    border-collapse: collapse;
`

type MTableHeaderProps = {
    $isSortable: boolean,
    $width?: string,
}

export const MTableHeader = styled.th<MTableHeaderProps>`
    border: 2px solid black;
    background-color: #0059b2;
    color: white;
    text-transform: capitalize;
    padding: 0.5rem 0.5rem;
    width: ${(props) => (props.$width ? props.$width : "auto")};
    cursor: ${(props) => (props.$isSortable ? "pointer" : "auto")};
`

export const MTableData = styled.td`
    border: 1px solid gray;
    padding: 0.5rem 0.5rem;
    text-align: left;
`

type MTableRowProps = {
    $selected?: boolean
}

export const MTableRow = styled.tr<MTableRowProps>`
    background-color: ${props => props.$selected ? "#bfbdbd" : ""};
    
    &:hover {
        background-color: #bfbdbd;
    }
    
    transition: all 0.1s ease-in-out;
`

export const SortingIconContainer = styled.span`
    display: inline-block;
    width: 16px;
`


