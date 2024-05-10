import { Menu } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DefaultImage from './images/default-profile-img.png';
import './profile.css';

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user.img)
  return (
     <div className="profile">

      <Menu />
        <div className="user-info">
          <img src={user.img || DefaultImage} className="user-image mb-4" alt=""/>
          <h2>Name: {user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Country: {user.country}</p>
          <p>City: {user.city}</p>
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>
        </div>
      </div>
);
}

export default Profile;