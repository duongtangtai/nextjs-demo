import React from 'react'
import { NavbarContainer, NavbarInfoProject, NavbarInfoUser, NavbarInfoUserDetail} from './styled'
import Logout from '../logout/Logout'

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarInfoProject>OPUS CONTAINER</NavbarInfoProject>
      <NavbarInfoUser>
        <NavbarInfoUserDetail>
          <span className='key'>NAME</span>
          <span className='value'>OPUS ADMIN</span>
        </NavbarInfoUserDetail>
        <NavbarInfoUserDetail>
          <span className='key'>ID</span>
          <span className='value'>OPUSADM</span>
        </NavbarInfoUserDetail>
        <NavbarInfoUserDetail>
          <span className='key'>OFFICE</span>
          <span className='value'>SINHO</span>
        </NavbarInfoUserDetail>
        <Logout />
      </NavbarInfoUser>
    </NavbarContainer>
  )
}

export default Navbar