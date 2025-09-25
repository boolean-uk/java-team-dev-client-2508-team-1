
import './style.css';
import { useNavigate } from 'react-router-dom';
import CascadingMenuSearch from './cascadinuMenuSearch';
import { useEffect, useRef, useState } from 'react';
import SimpleProfileCircle from '../simpleProfileCircle';
const UserIconTeacherView = ({ id, initials, firstname, lastname, role, menuVisible, photo=null}) => {

    const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
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
   
    const getColorFromInitials = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % styleGuideColors.length;
    return styleGuideColors[index];
    };

    const backgroundColor = getColorFromInitials(initials);

    const viewProfile = () => {
        navigate(`/profile`); // Må legge til ID - senere
    }

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuVisible(false);
        }
    };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            };
    }, []);


    return (
            <div className="user">

                <div className="profile-circle">
                <div className="profile-icon" style={{background: backgroundColor}}>
                    <SimpleProfileCircle initials={initials} photo={photo} />

                </div>
                </div>
                <div className="user-info">
                        <p className = "user-name">{firstname} {lastname}</p> 
                        <p className = "user-role" >{role}</p>
                    
                </div>
                <div className="buttons-container">
                        <button className="buttons" onClick = {viewProfile}>Profile</button>
                        <button className="buttons">Add note</button>
                        <button className="buttons">Move to cohort </button>
                </div>

                <div ref = {menuRef} className="edit-icon-wrapper">
                    <div className="icon-button" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                        <span className="dots">
                        <span className="dot">•</span>
                        <span className="dot">•</span>
                        <span className="dot">•</span>
                    </span>
                    </div>
               
                 
                    <div className='cascading-menu-container'> 
                        {isMenuVisible && <CascadingMenuSearch />}
                    </div>
                </div>
                        
            </div> 
    )   
}

export default UserIconTeacherView;
