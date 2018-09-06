import React from 'react';
import MessageTimeline from '../Messages/MessageTimeline';

const Homepage = ({ currentUser, history }) => (
  <div>{currentUser.isAuthenticated ?
    <MessageTimeline /> :
    history.push('/signin')
  } </div>
);

export default Homepage;
