import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage/Homepage';
import Landing from '../components/Landing/Landing';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/error";
import Navbar from "./Navbar/Navbar";
import { validateToken } from '../store/actions/auth';
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';
import NewMessageForm from '../components/Messages/NewMessageForm';
import withAuth from '../hocs/withAuth';

const loadingContainerStyles = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center'
};

const loadingStylesOverride = css`
    margin: auto;
    
    &>div {
      height: 20px;
      animation-delay: 0;
    }
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenValidated: false
    }
  }

  componentDidMount() {
    this.props.validateToken()
      .then(() => this.setState({tokenValidated: true}))
      .catch(() => console.log('There was an error validating your token.'));
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
          <Route
            path='/users/:id/messages/new'
            component={withAuth(NewMessageForm)}
          />
          <Route path='/' render={() => <Redirect to='/'/>}/>
        </Switch>
      )
    } else {
      return (
        <div className='sweet-loading' style={loadingContainerStyles}>
          <ScaleLoader
            className={loadingStylesOverride}
            sizeUnit={"px"}
            size={150}
            color={'#4d8fd7'}
            style={{margin: 'auto'}}
          />
        </div>
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