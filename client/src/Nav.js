import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => (
	<nav className="Nav">
		<div className="nav-link"><Link to='/'>Home</Link></div>
		<div className="nav-link"><Link to='/list'>All Months</Link></div>
	</nav>
)

export default Nav;
