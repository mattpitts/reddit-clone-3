import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
  			<Link className="navbar-brand" to="/">Reddit Clone</Link>
		</nav>
	)
}

export default Header;
