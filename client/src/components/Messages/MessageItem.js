import React from 'react';
import DefaultProfileImage from '../../images/default-profile-image.jpg';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Moment from 'react-moment';
import './Messages.css';

const MessageItem = ({
    date,
    profileImageUrl,
    text,
    username,
    removeMessage,
    isCorrectUser
  }) => {

  const submit = () =>
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          label: 'Yes',
          onClick: removeMessage
        },
        {
          label: 'No'
        }
      ],
      style: {color: 'red'},
    });

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
          {isCorrectUser && <button
            className='btn btn-danger delete-msg-btn'
            onClick={submit}
          >
            Delete
          </button>}
        </div>
      </li>
    </div>
  )
};

export default MessageItem;