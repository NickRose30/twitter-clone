import React from 'react';
import MessageTimeline from '../Messages/MessageTimeline';

const Homepage = ({ currentUser, history }) => (
  <div>{currentUser.isAuthenticated ?
    <MessageTimeline
      profileImageUrl={currentUser.user.profileImageUrl}
      username={currentUser.user.username}
    /> : history.push('/signin')
  } </div>
);

export default Homepage;
