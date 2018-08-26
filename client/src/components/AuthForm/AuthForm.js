import React, { Component } from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const type = this.props.signUp ? 'signup' : 'authenticate';
    this.props.onAuth(type, this.state).then(() => {
      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImageUrl: ''
      })
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    const { username, email, profileImageUrl, password, confirmPassword } = this.state;
    const { heading, buttonText, signUp, errors, removeError, history, subText } = this.props;

    /** This will listen for any change in the route and will execute the callback when a route change occurs */
    history.listen(() => {
      removeError();
    });

    return (
      <div className='row text-center'>
        <div className='col-md-5'>
          <form onSubmit={this.handleSubmit}>
            <h1 className='auth-header'>{heading}</h1>
            {errors.message && (<div className='alert alert-danger'>{errors.message}</div>)}
            {signUp && (
              <div>
                <label htmlFor='username'>Username:</label>
                <input
                className='form-control'
                id='username'
                type='text'
                value={username}
                name='username'
                onChange={this.handleChange}
                />
              </div>
            )}
            <label htmlFor='email'>Email:</label>
            <input
              className='form-control'
              id='email'
              type='text'
              value={email}
              name='email'
              onChange={this.handleChange}
            />
            <label htmlFor='password'>Password:</label>
            <input
              className='form-control'
              id='password'
              type='password'
              value={password}
              name='password'
              onChange={this.handleChange}
            />
            {signUp && (
              <div>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                  className='form-control'
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  name='confirmPassword'
                  onChange={this.handleChange}
                />
                <label htmlFor='profileImageUrl'>Profile Image URL:</label>
                <input
                  className='form-control'
                  id='profileImageUrl'
                  type='text'
                  value={profileImageUrl}
                  name='profileImageUrl'
                  onChange={this.handleChange}
                />
              </div>
            )}
            <button type='submit' className='btn btn-primary btn-block btn-lg'>{ buttonText }</button>
            <p className='subText'>
              {subText}
              <Link className='redirect-link' to={signUp ? 'signin' : 'signup'}>
                {signUp ? ' Log in here.' : ' Sign up now.'}
              </Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default AuthForm;