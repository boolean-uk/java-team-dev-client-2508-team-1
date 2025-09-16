import React from 'react';
import './fullscreenCard.css';
import UserIcon from "../profile-icon"; 
import ProfileData from '../../pages/profile/profile-data';

const FullScreenCard = ({ children }) => {
  return (
    <div className="fullscreen-card">
      <div className="top-bar">
        <UserIcon
          className="user-icon"
          initials="AJ"
          firstname="Alice"
          lastname="Johnson"
          role="Software Development"
        />
        <button className="edit">Edit Profile</button>
      </div>
      <section className="post-interactions-container border-top"></section>

      <ProfileData />
      <div className="bottom-buttons">
        <button className="cancel">Cancel</button>
        <br></br><br></br>
        <button className="save">Save</button>
      </div>
    </div>
  );
};

export default FullScreenCard;
