import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../../store/actions/auth.actions';

import {Dropdown, DropdownButton, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavbarLoginButton = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const loading = useSelector(state => state.base.loading);
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
  }, [loggedIn, loading]);

  return (
    <React.Fragment>
      {loggedIn 
        ? <DropdownButton id='dropdown-basic-button' className='navbar-item' title={`${firstname} ${lastname} `}>
            {/* use Link wrapper instead of Dropdown href='/profile' to avoid unnecessary reload/redirect */}
            <Link to='/profile'>
              <Dropdown.Item as='button'>My Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item as='button' id='signout' onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
          </DropdownButton>
        : loading
          ? <Spinner animation='border' role='status' variant='light'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          : <div id='login-button' className='navbar-item last-page'/>
      }
    </React.Fragment>
  )
}

export default NavbarLoginButton;