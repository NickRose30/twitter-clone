import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/error";

const Main = props => {
  const { authUser, errors, removeError } = props;
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/' render={props => <Homepage {...props} />}/>
        <Route exact path='/signin' render={props => (
          <AuthForm
            buttonText='Log In'
            heading='Welcome Back'
            onAuth={authUser}
            errors={errors}
            removeError={removeError}
            {...props}
          />
        )}/>
        <Route exact path='/signup' render={props => (
          <AuthForm
            buttonText='Sign Up'
            heading='Join Today'
            onAuth={authUser}
            errors={errors}
            removeError={removeError}
            signUp
            {...props}
          />
        )}/>
      </Switch>
    </div>
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