import React, { Component } from 'react';

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
      console.log('logged in successfully');
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    const { username, email, profileImageUrl } = this.state;
    const { heading, buttonText, signUp } = this.props;
    return (
      <div className='row justify-content-md-center text-center'>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
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
          </form>
        </div>
      </div>
    )
  }
}

export default AuthForm;