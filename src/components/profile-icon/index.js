import './style.css';

const UserIcon = ({initials, name, role}) => {

    return (
            <div className="user">
                <div className="profile-circle">
                <div className="profile-icon">
                    <p>{initials}</p>
                </div>
            </div>
            <div className="user-info">
                <p className = "user-name">{name}</p> 
                <p className = "user-role" >{role}</p>
            </div>
            <div className="edit-icon">
                <p>...</p>
            </div>
            </div>
                
    );
}

export default UserIcon;