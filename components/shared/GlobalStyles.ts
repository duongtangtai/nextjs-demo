import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        position: absolute;
        height: 100%;
        width: 100%;
        margin: 0;
        overflow: auto;
        font-size: 16px;
        &.no-scroll {
            overflow: hidden;
        }
    }

    body .no-scroll {
        overflow: hidden;
    }

    .hidden {
        display: none;
    }
`

export default GlobalStyles