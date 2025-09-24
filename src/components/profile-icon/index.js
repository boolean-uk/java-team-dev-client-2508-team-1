import './style.css';
import SeeProfile from '../seeProfile';
import { useState } from 'react';
import SimpleProfileCircle from '../simpleProfileCircle';

const UserIcon = ({ id, initials = '', firstname = '', lastname = '', role = '', menu = true, photo = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const styleGuideColors = [
    "#28C846",
    "#A0E6AA",
    "#46DCD2",
    "#82E6E6",
    "#5ABEDC",
    "#46C8FA",
    "#46A0FA",
    "#666EDC"
  ];

  const getColorFromInitials = (init) => {
    const text = init || '';
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % styleGuideColors.length;
    return styleGuideColors[index];
  };

  const backgroundColor = getColorFromInitials(initials);

  return (
    <div className="user">
      <div className="profile-circle">
        <div className="profile-icon" style={{ background: backgroundColor }}>
          <SimpleProfileCircle photo={photo} initials={initials} />
        </div>
      </div>

      {menu && (
        <>
          <div className="user-info">
            <p className="user-name">{firstname} {lastname}</p>
            <p className="user-role">{role}</p>
          </div>

          <div className="edit-icon-wrapper" onClick={() => setIsOpen(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}>
            <div className="icon-button" aria-label="Open profile">
              <span className="dots">
                <span className="dot">•</span>
                <span className="dot">•</span>
                <span className="dot">•</span>
              </span>
            </div>
            {menu &&  <><div className="user-info">
                <p className = "user-name">{firstname} {lastname}</p> 
                <p className = "user-role" >{role}</p>
            </div>
            
                <div className="edit-icon-wrapper" onClick={() => setIsOpen(true)}>

                <div className="icon-button">
                    <span className="dots">
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                </span>
                </div>
                </div>
                 
                {isOpen && (
                    <div>

                <SeeProfile 
                        id = {id}
                        initials={initials} 
                        firstname = {firstname} 
                        lastname = {lastname} 
                        role = {role}   
                        />
            </div>              
    )   } </>}
    </div>
    )

}

export default UserIcon;
