import './style.css';
import SeeProfile from '../seeProfile';
import Popup from 'reactjs-popup';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';

const UserIcon = ({initials, firstname, lastname, role}) => {
    const { token } = useAuth();
    let userIdFromToken = null;

    try {
        const decoded = jwtDecode(token);
        userIdFromToken = decoded.userId;
    } catch (err) {
        console.error('Error by UserIcon', err);
    }

    return (
            <div className="user">
                <div className="profile-circle">
                <div className="profile-icon">
                    <p>{initials}</p>
                </div>
            </div>
            <div className="user-info">
                <p className = "user-name">{firstname} {lastname}</p> 
                <p className = "user-role" >{role}</p>
            </div>
            <Popup trigger= { <div className="edit-icon"> 
                <p>...</p>  </div> } position="left center"
                closeOnDocumentClick
                arrow={false}>
                <SeeProfile 
                    initials={initials} 
                    firstname = {firstname} 
                    lastname = {lastname} 
                    role = {role}
                    userId={userIdFromToken}   
                />
            </Popup>
            </div> 
    )   
}

export default UserIcon;