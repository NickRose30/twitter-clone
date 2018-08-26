import React, { Component } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import img from '../../images/landing.jpg';
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
    document.body.style.backgroundSize = null;
    document.body.style.backgroundAttachment = null;
  }

  render() {
    return [
      <h1 className='page-title' key='0' >Twitter Clone</h1>,
      <AuthForm key='1' {...this.props} />
    ]
  }
}

export default Landing;