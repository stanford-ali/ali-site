import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component {
  render() {
    return(
      <section id='profile'>
        <div className='profile-content'>
          <div className='profile-box profile-info'>
            <div className='profile-info-banner'>
              <i className='fa fa-user fa-3x' style={{margin: '20px 0'}}/>
            </div>
            <div className='questions'>
              <h3>{`${this.props.currentUser.firstname} ${this.props.currentUser.lastname}`}</h3>
            </div>
          </div>
          <div className='profile-box profile-following'>
            <div className='profile-following-banner'>
              <h1>Following</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }
}