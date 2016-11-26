// Libs
import React from 'react';
import {Link} from 'react-router';

const NavLink = props => (
    <Link {...props} activeClassName="activeClassName"/>
);

export default NavLink;