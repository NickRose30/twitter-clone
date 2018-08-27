import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage/Homepage';
import Landing from '../components/Landing/Landing';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/error";
import Navbar from "./Navbar";
import { validateToken } from '../store/actions/auth';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenValidated: false
    }
  }

  componentDidMount() {
    this.props.validateToken()
      .then(() => this.setState({tokenValidated: true}));
  }

  render() {
    if (this.state.tokenValidated) {
      const {authUser, errors, removeError, currentUser} = this.props;
      return (
        <Switch>
          <Route exact path='/' render={props => (
            <div>
              <Navbar/>
              <div className='container'>
                <Homepage currentUser={currentUser} {...props} />
              </div>
            </div>
          )}/>
          <Route exact path='/signin' render={props => (
            <div className='container'>
              <Landing
                buttonText='Log In'
                heading='Welcome Back'
                subText={`Don't have an account yet?`}
                onAuth={authUser}
                errors={errors}
                removeError={removeError}
                {...props}
              />
            </div>
          )}/>
          <Route exact path='/signup' render={props => (
            <div className='container'>
              <Landing
                buttonText='Sign Up'
                heading='Join Today'
                subText='Already have an account?'
                onAuth={authUser}
                errors={errors}
                removeError={removeError}
                signUp
                {...props}
              />
            </div>
          )}/>
          <Route path='/' render={() => <Redirect to='/'/>}/>
        </Switch>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
};

const mapDispatchToProps = () => {
  return {
    authUser,
    removeError,
    validateToken
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Main));