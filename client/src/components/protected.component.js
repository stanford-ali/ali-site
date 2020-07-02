import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class ProtectedRoute extends Component {
  render() {
    const Component = this.props.component;

    return this.props.userIsSignedIn ? (
      <Component/>
    ) : (
      <Redirect to='/login' userIsSignedIn={this.props.userIsSignedIn}/>
    );
  }
}