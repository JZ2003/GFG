import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
  } from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to="/mymods" activeStyle>
			Mods
		</NavLink>
		<NavLink to="/create" activeStyle>
			Upload/Edit Mods
		</NavLink>
		<NavLink to="/about" activeStyle>
			About Us
		</NavLink>
		</NavMenu>
		<NavBtn>
          <NavBtnLink to='/login_signup'>Log In/Sign Up</NavBtnLink>
        </NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
