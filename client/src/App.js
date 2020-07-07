import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Components from './components';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsSignedIn: null,
      authInstance: null,
      currentUser: {}
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
          const userIsSignedIn = authInstance.isSignedIn.get();
          this.setState({
            authInstance: authInstance,
            userIsSignedIn: userIsSignedIn
          });
          if (userIsSignedIn) this.onSignIn();

          // repeat above; sensitive to changes in state
          authInstance.isSignedIn.listen(userIsSignedIn => {
            this.setState ({
              userIsSignedIn: userIsSignedIn
            });

            if (userIsSignedIn) this.onSignIn();
            else this.onLogout();
          })
        })
    })
  }

  onSignIn() {
    this.loadOrCreateUser();
    document.querySelector('#login-button').classList.add('hidden');
    document.querySelector('#profile-icon').classList.remove('hidden');
    document.querySelector('#signout').classList.remove('hidden');
  }

  onLogout() {
    this.setState({
      currentUser: {}
    })
    document.querySelector('#login-button').classList.remove('hidden');
    document.querySelector('#profile-icon').classList.add('hidden');
    document.querySelector('#signout').classList.add('hidden');
  }

  loadOrCreateUser() { // assumption: all calls will have already checked if user is signed in
    // note: students/oauth/:googleid !== students/:studentid, but serve similar purposes
    let currentUser = this.state.authInstance.currentUser.get().getBasicProfile();
    let user_id = currentUser.getId();
    axios.get(`http://localhost:5000/students/oauth/${user_id}`)
      .then(res => {
        if (res.data.length > 0) { // load the user
          this.setState({
            currentUser: res.data[0]
          })
        } else { // create new user
          axios.post('http://localhost:5000/students', {
            google_id: user_id,
            firstname: currentUser.getGivenName(),
            lastname: currentUser.getFamilyName(),
            email: currentUser.getEmail()
          })
            .then(res => {
              this.setState({
                currentUser: res.data[0]
              })
              console.log(res.data);
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Components.Navbar {...this.state}/>
          <Switch>
            <Route exact path='/'>
              <Components.Background/>
              <Components.Home/>
            </Route>
            <Route exact path='/projects' component={Components.Projects}/>
            <Route exact path='/projects/:projectid' component={Components.ProjectView}/>
            <Route exact path='/login'>
              <Components.Login userIsSignedIn={this.state.userIsSignedIn} authInstance={this.state.authInstance}/>
            </Route>
            <Components.ProtectedRoute exact path='/profile' component={Components.Profile} {...this.state}/>
            {/* <Components.ProtectedRoute exact path='/admin' component={Components.Admin}/> */}
          </Switch>
          <Components.Footer/>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}