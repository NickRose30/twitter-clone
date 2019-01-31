import React from 'react';
import DefaultProfileImage from '../../images/default-profile-image.jpg';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './MessageItem.css';

const MessageItem = ({
    date,
    profileImageUrl,
    text,
    username,
    removeMessage
  }) => {
  return (
    <div>
      <li className='list-group-item'>
        <img
          src={profileImageUrl || DefaultProfileImage}
          alt={username}
          height='100'
          width='100'
          className='timeline-image'
        />
        <div className='message-body'>
          <div className='text-area'>
            <Link to='/'>@{username}&nbsp;</Link>
            <span className='text-muted'>
              {date &&
                <Moment className='text-muted' format=' Do MMM YYYY' >
                  {date}
                </Moment>
              }
            </span>
            <p>{text}</p>
          </div>
          <button className='btn btn-danger delete-msg-btn' onClick={removeMessage}>X</button>
        </div>
      </li>
    </div>
  )
};

export default MessageItem;