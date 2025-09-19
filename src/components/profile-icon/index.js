import './style.css';
import SeeProfile from '../seeProfile';
import Popup from 'reactjs-popup';

const UserIcon = ({ id, initials, firstname, lastname, role}) => {

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
                        id = {id}
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