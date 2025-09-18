import Popup from 'reactjs-popup';
import './style.css';
import SeeProfile from '../seeProfile'

const UserIcon = ({ initials, firstname, lastname, role }) => {


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



    return (
            <div className="user">

                <div className="profile-circle">
                <div className="profile-icon" style={{background: backgroundColor}}>
                    <p>{initials}</p>
                </div>
            </div>
            <div className="user-info">
                <p className = "user-name">{firstname} {lastname}</p> 
                <p className = "user-role" >{role}</p>
            </div>
            <Popup trigger= { 
                <div className="edit-icon-wrapper">
                <div className="icon-button">
                    <span className="dots">
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                </span>
                </div>
                </div>
                 
                } position="left center"
                closeOnDocumentClick
                arrow={false}>
                <SeeProfile 
                        initials={initials} 
                        firstname = {firstname} 
                        lastname = {lastname} 
                        role = {role}   
                        />
            </Popup>
            </div> 
    )   
}


export default UserIcon;


  