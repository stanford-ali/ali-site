import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return(
      <section id='footer'>
        <div className='footer-content'>
          <div className='footer-contact'>
            <h3>Contact Us</h3>
            <p>
              If you have a question or suggestion, or want to work with us, we'd
              love to hear from you!
            </p>
          </div>
          <div className='footer-partners'>
            <h3>Partners</h3>
            <img src={require('../assets/partners.png')} alt='' />
          </div>
          <div className='footer-people'>
            <h3>People</h3>
            <p>Alix Cui</p>
            <p>Sydney Von Arx</p>
          </div>
        </div>
      </section>
    )
  }
}