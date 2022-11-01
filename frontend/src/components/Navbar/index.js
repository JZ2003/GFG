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
		<NavLink to="/project" activeStyle>
			Mods
		</NavLink>
		<NavLink to="/create_edit_project" activeStyle>
			Upload/Edit Mods
		</NavLink>
		<NavLink to="/about" activeStyle>
			About
		</NavLink>
		<NavLink to="/login" activeStyle>
			Sign Up
		</NavLink>
		</NavMenu>
		<NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
