import './style.css';
import SeeProfile from '../seeProfile';
import { useEffect, useRef, useState } from 'react';
import SimpleProfileCircle from '../simpleProfileCircle';

const UserIcon = ({ id, initials = '', firstname = '', lastname = '', role = '', menu = true, photo = null }) => {
  const [isOpen, setIsOpen] = useState(false);
   const menuRef = useRef(null);


useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


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
    <>
      <div className="user">
        <div className="profile-circle">
          <div className="profile-icon" style={{ background: backgroundColor }}>
            <SimpleProfileCircle photo={photo} initials={initials} />
          </div>
        </div>

        <div className="user-info">
          <p className="user-name">{firstname} {lastname}</p>
          <p className="user-role">{role}</p>
        </div>

        <div 
          className="edit-icon-wrapper" 
          ref={menuRef}
          onClick={() => setIsOpen((prev) => !prev)}
          >
          <div className="icon-button">
            <span className="dots">
              <span className="dot">•</span>
              <span className="dot">•</span>
              <span className="dot">•</span>
            </span>
          </div>
        </div>
      </div>

        {isOpen && (
          <div className="pop-up">
            <SeeProfile
              photo={photo}
              id={id}
              initials={initials}
              firstname={firstname}
              lastname={lastname}
              role={role}
              />
          </div>
        )}
    </>
  );
}; 
export default UserIcon;
