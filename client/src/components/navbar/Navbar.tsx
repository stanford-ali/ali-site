import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownButton} from 'react-bootstrap';

import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/actions/auth.actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const {firstname, lastname} = useSelector(state => ({
    firstname: state.auth.user ? state.auth.user.firstname : '',
    lastname: state.auth.user ? state.auth.user.lastname : ''
  }));
  
  useEffect(() => {
    if (window.gapi && !loggedIn) {
      window.gapi.load('signin2', () => {
        window.gapi.signin2.render('login-button', {});
      });
    }
  }, [loggedIn]);

  return (
    <section id='navbar'>
      <div>
        <nav id='navbar'>
          <div className='navbar'>
            <Link to='/' className='navbar-item'>
              <img id='logo' src={require('../../assets/logo.svg')} alt='' />
            </Link>
            <Link to='/' className='navbar-item navbar-title'><span>Applied Learning Initiative</span></Link>
            <Link to='/' className='navbar-item page first-page'>Home</Link>
            <Link to='/projects' className='navbar-item page'>Projects</Link>
            {loggedIn 
              ? <DropdownButton id='dropdown-basic-button' className='navbar-item' title={`${firstname} ${lastname} `}>
                  <Dropdown.Item href='/profile'>My Profile</Dropdown.Item>
                  <Dropdown.Item as='button' id='signout' onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
                </DropdownButton>
              : <div id='login-button' className='navbar-item last-page'/>
            }
          </div>
        </nav>
      </div>
    </section>
  )
};

export default Navbar;