import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';

const Main = props => (
  <div className='container'>
    <Switch>
      <Route exact path='/' render={props => <Homepage {...props} />} />
      <Route exact path='/signin' render={props => (
        <AuthForm button-text='Log In' heading='Welcome Back' {...props} />
      )} />
      <Route exact path='/signup' render={props => (
        <AuthForm button-text='Sign Up' heading='Join Today' {...props} />
      )} />
    </Switch>
  </div>
);

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
};

export default withRouter(connect(mapStateToProps, null)(Main));