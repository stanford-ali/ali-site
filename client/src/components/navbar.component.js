import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.onSignOut = this.onSignOut.bind(this);
  }
  componentDidUpdate(props) {
    if (this.props.userIsSignedIn === null) return; // handle async

    window.gapi.load('signin2', () => {
      window.gapi.signin2.render('login-button');
    })
  }

  onSignOut() {
    if (this.props.authInstance === null) return;
    this.props.authInstance.signOut();
  }

  render() {
    return(
      <section id='navbar'>
        <div className='container-fluid'>
          <nav id='navbar'>
            <div className='navbar'>
              <Link to='/' className='navbar-item'> 
                <img id='logo' src={require('../assets/logo.svg')} alt=''/>
              </Link>
              <Link to='/' className='navbar-item navbar-title'>Applied Learning Initiative</Link>
              <Link to='/categories' className='navbar-item page first-page'>Projects</Link>
              <div id='login-button' className='navbar-item last-page'/>
              <Link to='/profile' id='profile-icon' className='navbar-item hidden'>
                <i className='fa fa-user-circle-o'/>
              </Link>
              <button id='signout' className='navbar-item page last-page astext hidden' onClick={this.onSignOut}>Logout</button>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}