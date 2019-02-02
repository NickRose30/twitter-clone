import React from 'react';
import DefaultProfileImage from '../../images/default-profile-image.jpg';
import './UserAside.css';

const UserAside = ({ profileImageUrl, username }) => (
  <aside className='col-sm-2'>
    <div className='panel panel-default'>
      <div className='panel-body'>
        <img
          className='user-aside img-thumbnail'
          src={profileImageUrl || DefaultProfileImage}
          alt={username}
        />
      </div>
    </div>
  </aside>
);

export default UserAside;