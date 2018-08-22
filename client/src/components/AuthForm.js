import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      profileImageUrl: ''
    };
    AuthForm.handleChange = AuthForm.handleChange.bind(this);
  }

  static handleChange(e) {
    console.log(e)
  }

  render() {
    const { username, email, password, profileImageUrl } = this.state;
    const { heading } = this.props;
    return (
      <div className='row justify-content-md-center text-center'>
        <div className='col-md-6'>
          <form>
            <h2>{heading}</h2>
            <label htmlFor='email'>Email:</label>
            <input
              className='form-control'
              id='email'
              type='text'
              value={email}
              name='email'
              onChange={AuthForm.handleChange}
            />
            <label htmlFor='password'>Password:</label>
            <input
              className='form-control'
              id='password'
              type='password'
              name='password'
              onChange={AuthForm.handleChange}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default AuthForm;