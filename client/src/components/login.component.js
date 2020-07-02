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
        <div className='container'>
          <p>This is a placeholder...once logged in, redirect to profile</p>
        </div>
      )
    }
  }
}