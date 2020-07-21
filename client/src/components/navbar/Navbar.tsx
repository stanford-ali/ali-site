import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import NavbarLoginButton from './NavbarLoginButton/NavbarLoginButton';

const Navbar = () => (
  <section id='navbar'>
    <div>
      <nav id='navbar'>
        <div className='navbar'>
          <Link to='/' className='navbar-item'>
            <img id='logo' src={require('../../assets/logo.svg')} alt='' />
          </Link>
          <Link to='/' className='navbar-item navbar-title'>
            <span>Applied Learning Initiative</span>
          </Link>
          <NavLink to='/' exact className='navbar-item page first-page' activeClassName='active'>Home</NavLink>
          <NavLink to='/projects' exact className='navbar-item page' activeClassName='active'>Projects</NavLink>
          <NavbarLoginButton/>
        </div>
      </nav>
    </div>
  </section>
)

export default Navbar;