import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage/Homepage';
import Landing from '../components/Landing/Landing';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/error";
import Navbar from "./Navbar";

const Main = props => {
  const { authUser, errors, removeError } = props;
  return (
      <Switch>
        <Route exact path='/' render={props => (
          <div>
            <Navbar />
            <div className='container'>
              <Homepage {...props} />
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
              subText={`Already  have an account?`}
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              signUp
              {...props}
            />
          </div>
        )}/>
      </Switch>
  )
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
};

const mapDispatchToProps = () => {
  return {
    authUser,
    removeError
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Main));