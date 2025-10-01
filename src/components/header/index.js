import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/EditIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import jwtDecode from 'jwt-decode';
import SimpleProfileCircle from '../simpleProfileCircle';


const Header = () => {
  const { token, onLogout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  
  // Safely decode token with fallback
  let decodedToken = {};
  try {
    if (token || localStorage.getItem('token')) {
      decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
    }
  } catch (error) {
    console.error('Invalid token in Header:', error);
  }
  
  const fullName = `${decodedToken.firstName || decodedToken.first_name || 'Current'} ${decodedToken.lastName || decodedToken.last_name || 'User'}`;
  const initials = fullName?.match(/\b(\w)/g)?.join('') || 'NO';


  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (!token) {
    return null;
  }

  let userIdFromToken = null;

  const decoded = jwtDecode(token || localStorage.getItem('token'));
  userIdFromToken = decoded.userId;

  return (
    <header className="app-header">
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <SimpleProfileCircle
        photo={localStorage.getItem("userPhoto")}
        initials={initials} />
      
      </div>

      {isMenuVisible && (
        <div ref={menuRef} className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <SimpleProfileCircle
                          initials={initials}
                          photo={localStorage.getItem("userPhoto")} />

                
              </div>

              <div className="post-user-name">
                <p>{fullName}</p>
                <small>{decoded.specialism}, Cohort {decoded.cohortId || "3"}</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to={`/profile/${userIdFromToken}`} >
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
