import React from 'react';
import MessageList from '../../containers/Messages/MessageList';
import UserAside from '../UserAside/UserAside';

const MessageTimeline = ({ profileImageUrl, username }) => (
  <div className='row'>
    <UserAside
      profileImageUrl={profileImageUrl}
      username={username}
    />
    <MessageList />
  </div>
);

export default MessageTimeline;