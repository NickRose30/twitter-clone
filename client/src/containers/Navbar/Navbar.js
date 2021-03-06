import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import './Navbar.css';

class Navbar extends Component {

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <nav className='navbar navbar-expand'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            <h1>Twitter Clone</h1>
          </Link>
        </div>
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
              <p className='new-message-btn'>New Message</p>
            </Link>
          </li>
          <li>
            <a onClick={this.logout}>Log Out</a>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps, { logout })(Navbar);