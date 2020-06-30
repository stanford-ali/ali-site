import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

//TODO: add buttons to the submit a project and join mailing list portion
export default class Home extends Component {
  render() {
    return(
      <section id='home-box'>
        <div className='hb-content'>
          <div className='hb-container hb-text'>
            <h1>CONNECTING STUDENTS TO HIGH-IMPACT PROJECTS</h1>
            <p>
              We draw students with quantitative backgrounds from computer science,
              mathematics, physics, statistics, and other departments across
              Stanford. Students provide much needed expertise while gaining
              valuable experience working on real-world projects.
            </p>
            <ul className='fa-ul'>
              <li>
                <i className='index-bullet fa fa-chevron-right'></i>SUBMIT A PROJECT
              </li>
              <li>
                <i className='index-bullet fa fa-chevron-right'></i>JOIN OUR MAILING
                LIST
              </li>
            </ul>
          </div>
          <div className='hb-container hb-image'>
            <img src={require('../assets/banner.png')} alt='' />
          </div>
        </div>
      </section>
    )
  }
}