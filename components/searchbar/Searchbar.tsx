import React from 'react'
import { SearchbarContainer } from './styled'

const Searchbar = ({children} : {children: React.ReactNode}) => {
  console.log("render searchbar")
  return (
    <SearchbarContainer>
        {children}
    </SearchbarContainer>
  )
}

export default Searchbar