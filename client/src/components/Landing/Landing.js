import React, { Component } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import img from '../../images/landing.jpg';

class Landing extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
    document.body.style.backgroundSize = null;
  }

  render() {
    return (
      <AuthForm {...this.props} />
    )
  }
}

export default Landing;