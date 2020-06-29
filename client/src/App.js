import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Components from './components';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsSignedIn: null,
      authInstance: null
    }
  }

  componentDidMount() {
    // dynamically add script to html, avoids issues with async loading
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      this.initializeGoogleSignIn();
    }

    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '206518429834-qpmlbht0e0t0gqa1kos5bmv9tt16f64g.apps.googleusercontent.com'
      })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          this.setState({
            authInstance: authInstance
          })
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({
            userIsSignedIn: isSignedIn
          });

          // replace google signin with logout button
          // make this a 'hide components' helper; if there's more content it will be easier to make it hidden
          // create a 'view components' helper as well to undo ^
          if (isSignedIn) {
            document.querySelector('#login-button').classList.add('hidden');
            document.querySelector('#profile-icon').classList.remove('hidden');
            document.querySelector('#signout').classList.remove('hidden');
          }
          // check if they exist in the database, load or create user

          // repeat above; sensitive to changes in state
          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState ({
              userIsSignedIn: isSignedIn
            });

            if (isSignedIn) {
              document.querySelector('#login-button').classList.add('hidden');
              document.querySelector('#profile-icon').classList.remove('hidden');
              document.querySelector('#signout').classList.remove('hidden');
              // check if they exist in the database, load or create user
            } else {
              document.querySelector('#login-button').classList.remove('hidden');
              document.querySelector('#profile-icon').classList.add('hidden');
              document.querySelector('#signout').classList.add('hidden');
            }
          })
        })
    })
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Components.Navbar userIsSignedIn={this.state.userIsSignedIn} authInstance={this.state.authInstance}/>
          <br/>
          <Switch>
            <Route exact path='/' component={Components.Home}/>
            <Route exact path='/projects' component={Components.Projects}/>
            <Route exact path='/projects/:projectid' component={Components.ProjectView}/>
            <Route exact path='/profile' component={Components.Profile}/>
          </Switch>
          <Components.Footer/>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}