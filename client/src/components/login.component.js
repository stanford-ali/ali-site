import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
  render() {
    if (this.props.userIsSignedIn) { // TODO: this is fairly slow/repetitive...find more efficient way to check login and render
      return(
        <Redirect to='/profile'/>
      )
    } else {
      return(
        <div className='container' style={{padding: '10px'}}>
          <h3>Oops! You're not logged in!</h3>
          <p>Click the <strong>Sign In</strong> button at the top right of the screen to log in with Google.</p>
        </div>
      )
    }
  }
}