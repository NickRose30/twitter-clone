import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      console.log(this.props.isAuthenticated);
      if(!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    }
  };

  return connect(mapStateToProps, null)(Authenticate);
}