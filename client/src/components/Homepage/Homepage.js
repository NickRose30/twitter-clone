import React from 'react';

const Homepage = ({ currentUser, history }) => (
  <div>{currentUser.isAuthenticated ?
    <div>This is the homepage</div> :
    history.push('/signin')
  }</div>
);

export default Homepage;
